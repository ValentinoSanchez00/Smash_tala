const express = require('express');
const router = express.Router();
const db = require('../bd/db');

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
            cl.nombre AS cliente_nombre
        FROM pedido p
        JOIN casa c ON p.casa_id_casa = c.id_casa
        JOIN cliente cl ON p.cliente_id_cliente = cl.id_cliente
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
    db.query('SELECT p.id_pedido, p.coste, p.tipo_pago, p.fecha, GROUP_CONCAT(DISTINCT h.nombre ORDER BY h.nombre ASC) AS hamburguesa, GROUP_CONCAT(DISTINCT a.tipo_alergeno ORDER BY a.tipo_alergeno ASC) AS alergenos FROM pedido p INNER JOIN pedido_esta_hamburguesa peh ON p.id_pedido = peh.pedido_id_pedido INNER JOIN hamburguesa h ON peh.hamburguesa_id_hamburguesa = h.id_hamburguesa LEFT JOIN hamburguesa_tiene_ingrediente hti ON h.id_hamburguesa = hti.hamburguesa_id_hamburguesa LEFT JOIN ingrediente i ON hti.ingrediente_id_ingrediente = i.id_ingrediente LEFT JOIN alergenos a ON i.alergenos_id_alergeno = a.id_alergeno WHERE p.cliente_id_cliente = ? GROUP BY p.id_pedido ORDER BY p.id_pedido ASC;', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener los pedidos:', err);
            return res.status(500).json({ error: 'Error al obtener los pedidos' });
        }
        res.json(results);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    console.log("llega")
    db.query('UPDATE pedido SET entregado = 1 WHERE id_pedido = ?', [ id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el pedido:', err);
            return res.status(500).json({ error: 'Error al actualizar el pedido' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.json({ message: 'Pedido actualizado exitosamente' });
    });
});

// Insertar un nuevo pedido
router.post('/', async (req, res) => {
    try {
        const id_pedido = await MaxIdPedido() + 1;

        const id_casa = await compareDireccion(req.body.direccion, req.body.id_cliente);
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const sql = 'INSERT INTO pedido (id_pedido,coste, cliente_id_cliente, casa_id_casa,tipo_pago,fecha,entregado) VALUES (?, ?, ?,?,?,?,?)';

        db.query(sql, [id_pedido, req.body.contenido.totalPrice, req.body.id_cliente, id_casa, req.body.tipo_pago, formattedDate,0], (err, result) => {
            if (err) {
                console.error('Error al insertar el pedido:', err);
                return res.status(500).json({ error: 'Error al insertar el pedido' });
            }
            for (let index = 0; index < req.body.contenido.items.length; index++) {
                let sql2 = 'INSERT INTO pedido_esta_hamburguesa (pedido_id_pedido, hamburguesa_id_hamburguesa) VALUES (?,?)';
                db.query(sql2, [id_pedido, req.body.contenido.items[index].food.id_hamburguesa], (err, result) => {
                    if (err) {
                        console.error('Error al insertar el pedido:', err);
                        return res.status(500).json({ error: 'Error al insertar el pedido' });
                    }
                });
            }
            res.status(201).json({ message: 'Pedido insertado correctamente' });
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
                    const id = result[0].id;
                    resolve(id);
                } else {
                    console.log("No se encontraron resultados.");
                    resolve(null);
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
                    const id = result[0].id;
                    resolve(id);
                } else {
                    console.log("No se encontraron resultados.");
                    resolve(null);
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
                    db.query(sql, [id_casa, direccion], (err, result) => {
                        if (err) {
                            console.error('Error al insertar la casa:', err);
                            reject(err);
                        } else {
                            let sql2 = 'INSERT INTO cliente_tiene_casa (id_cliente,id_casa) VALUES (?, ?)';
                            db.query(sql2, [id_cliente, id_casa], (err, result) => {
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

module.exports = router;
