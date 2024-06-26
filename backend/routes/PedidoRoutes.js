const express = require('express');
const router = express.Router();
const db = require('../bd/db');
const { promisify } = require('util');
const queryAsync = promisify(db.query).bind(db);

// Obtener todos los pedidos
router.get('/', (req, res) => {
    const query = `
    SELECT 
        p.coste, 
        p.entregado, 
        p.fecha, 
        p.id_pedido, 
        p.tipo_pago, 
        c.direccion AS casa_nombre, 
        cl.nombre AS cliente_nombre,
        GROUP_CONCAT(CONCAT(h.nombre, ' (', subquery.cantidad, ')') ORDER BY h.nombre SEPARATOR ', ') AS hamburguesas
    FROM pedido p
    JOIN casa c ON p.casa_id_casa = c.id_casa
    JOIN cliente cl ON p.cliente_id_cliente = cl.id_cliente
    JOIN pedido_esta_hamburguesa peh ON p.id_pedido = peh.pedido_id_pedido
    JOIN hamburguesa h ON peh.hamburguesa_id_hamburguesa = h.id_hamburguesa
    JOIN (
        SELECT 
            peh.pedido_id_pedido,
            h.id_hamburguesa,
            COUNT(*) AS cantidad
        FROM pedido_esta_hamburguesa peh
        JOIN hamburguesa h ON peh.hamburguesa_id_hamburguesa = h.id_hamburguesa
        GROUP BY peh.pedido_id_pedido, h.id_hamburguesa
    ) subquery ON p.id_pedido = subquery.pedido_id_pedido AND h.id_hamburguesa = subquery.id_hamburguesa
    GROUP BY p.id_pedido
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los pedidos:', err);
            return res.status(500).json({ error: 'Error al obtener los pedidos' });
        }
        res.json(results);
    });
});

// Obtener todos los pedidos de un cliente
router.get('/cliente/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT p.id_pedido, p.coste, p.tipo_pago, p.fecha,p.entregado, 
        GROUP_CONCAT(DISTINCT h.nombre ORDER BY h.nombre ASC) AS hamburguesa, 
        GROUP_CONCAT(DISTINCT a.tipo_alergeno ORDER BY a.tipo_alergeno ASC) AS alergenos 
        FROM pedido p 
        INNER JOIN pedido_esta_hamburguesa peh ON p.id_pedido = peh.pedido_id_pedido 
        INNER JOIN hamburguesa h ON peh.hamburguesa_id_hamburguesa = h.id_hamburguesa 
        LEFT JOIN hamburguesa_tiene_ingrediente hti ON h.id_hamburguesa = hti.hamburguesa_id_hamburguesa 
        LEFT JOIN ingrediente i ON hti.ingrediente_id_ingrediente = i.id_ingrediente 
        LEFT JOIN alergenos a ON i.alergenos_id_alergeno = a.id_alergeno 
        WHERE p.cliente_id_cliente = ? 
        GROUP BY p.id_pedido 
        ORDER BY p.id_pedido ASC;
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener los pedidos:', err);
            return res.status(500).json({ error: 'Error al obtener los pedidos' });
        }
        res.json(results);
    });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    let coste = 0;
    let email = '';

    try {
        // Actualizar el pedido
        const updateResult = await queryAsync('UPDATE pedido SET entregado = 2, cambio_estado_programado = DATE_ADD(NOW(), INTERVAL 7 MINUTE) WHERE id_pedido = ?', [id]);
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        // Obtener el máximo id_log
        const maxIdResult = await queryAsync('SELECT MAX(category_id) AS maxId FROM log');
        const newIdLog = maxIdResult[0].maxId + 1;

        // Obtener los datos del cliente
        const clienteResult = await queryAsync('SELECT p.coste, c.email FROM pedido p JOIN cliente c ON p.cliente_id_cliente = c.id_cliente WHERE p.id_pedido = ?', [id]);
        if (clienteResult.length === 0) {
            return res.status(404).json({ error: 'Datos de cliente no encontrados' });
        }
        coste = clienteResult[0].coste;
        email = clienteResult[0].email;

        // Formatear la fecha y crear el contenido del log
        const formattedDate = formatDate(new Date());
        const content = `El pedido de coste ${coste} de ${email} en la fecha ${formattedDate} se ha entregado de manera exitosa`;

        // Insertar en la tabla log
        await queryAsync('INSERT INTO log (category_id, id_log, fecha, contenido) VALUES (?, ?, ?, ?)', [newIdLog, 1, formattedDate, content]);

        // Insertar en la tabla jefe_ve_log
        await queryAsync('INSERT INTO jefe_ve_log (jefe_id, category_id) VALUES (1, ?)', [newIdLog]);

        res.json({ message: 'Pedido actualizado y log insertado exitosamente' });

    } catch (err) {
        console.error('Error en la operación:', err);
        res.status(500).json({ error: 'Error en la operación' });
    }
});

// Insertar un nuevo pedido
router.post('/', async (req, res) => {
    try {
        const id_pedido = await MaxIdPedido() + 1;
        const id_casa = await compareDireccion(req.body.direccion, req.body.id_cliente);
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const sql = 'INSERT INTO pedido (id_pedido,coste, cliente_id_cliente, casa_id_casa,tipo_pago,fecha,entregado) VALUES (?, ?, ?,?,?,?,?)';

        db.query(sql, [id_pedido, req.body.contenido.totalPrice, req.body.id_cliente, id_casa, req.body.tipo_pago, formattedDate, 0], (err) => {
            if (err) {
                console.error('Error al insertar el pedido:', err);
                return res.status(500).json({ error: 'Error al insertar el pedido' });
            }

            const promises = req.body.contenido.items.map(item => {
                const sql2 = 'INSERT INTO pedido_esta_hamburguesa (pedido_id_pedido, hamburguesa_id_hamburguesa) VALUES (?,?)';
                return new Promise((resolve, reject) => {
                    db.query(sql2, [id_pedido, item.food.id_hamburguesa], (err) => {
                        if (err) {
                            console.error('Error al insertar el pedido:', err);
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            });

            Promise.all(promises)
                .then(() => {
                    db.query('SELECT MAX(category_id) AS maxId FROM log', (err, result) => {
                        if (err) {
                            console.error('Error al obtener el max id_log:', err);
                            return res.status(500).json({ error: 'Error al obtener el max id_log' });
                        }

                        const newIdLog = result[0].maxId + 1;
                        const content = `El pedido con id ${id_pedido} ha sido creado`;
                        
                        const insertQuery = 'INSERT INTO log (category_id, id_log, fecha, contenido) VALUES (?, ?, ?, ?)';
                        db.query(insertQuery, [newIdLog, 1, formattedDate, content], (err) => {
                            if (err) {
                                console.error('Error al insertar en log:', err);
                                return res.status(500).json({ error: 'Error al insertar en log' });
                            }
                            
                        });

                        const insertQuery2 = 'INSERT INTO jefe_ve_log (jefe_id, category_id) VALUES (1, ?)';
                        db.query(insertQuery2, [newIdLog], (err) => {
                            if (err) {
                                console.error('Error al insertar en log:', err);
                                return res.status(500).json({ error: 'Error al insertar en log' });
                            }
                            res.status(201).json({ message: 'Pedido y log insertados correctamente' });
                        });
                    });
                })
                .catch(error => {
                    console.error('Error al insertar los elementos del pedido:', error);
                    res.status(500).json({ error: 'Error al insertar los elementos del pedido' });
                });
        });

    } catch (error) {
        console.error('Error al procesar el pedido:', error);
        res.status(500).json({ error: 'Error al procesar el pedido' });
    }
});

function MaxIdPedido() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT MAX(id_pedido) AS id FROM pedido';
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0].id);
                } else {
                    resolve(0);
                }
            }
        });
    });
}

function MaxIdCasa() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT MAX(id_casa) AS id FROM casa';
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0].id);
                } else {
                    resolve(0);
                }
            }
        });
    });
}

async function compareDireccion(direccion, id_cliente) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM casa WHERE direccion = ?';
        db.query(sql, [direccion], (err, result) => {
            if (result.length > 0) {
                resolve(result[0].id_casa);
            } else {
                MaxIdCasa().then(id_casa => {
                    id_casa += 1;
                    let sql = 'INSERT INTO casa (id_casa, direccion) VALUES (?, ?)';
                    db.query(sql, [id_casa, direccion], (err) => {
                        if (err) {
                            console.error('Error al insertar la casa:', err);
                            reject(err);
                        } else {
                            let sql2 = 'INSERT INTO cliente_tiene_casa (id_cliente, id_casa) VALUES (?, ?)';
                            db.query(sql2, [id_cliente, id_casa], (err) => {
                                if (err) {
                                    console.error('Error al insertar la casa:', err);
                                    reject(err);
                                } else {
                                    resolve(id_casa);
                                }
                            });
                        }
                    });
                }).catch(err => {
                    console.error('Error al obtener el ID de casa:', err);
                    reject(err);
                });
            }
        });
    });
}

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

module.exports = router;
