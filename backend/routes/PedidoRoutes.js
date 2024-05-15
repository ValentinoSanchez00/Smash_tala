const express = require('express');
const router = express.Router();
const db = require('../bd/db');

// Obtener todos los pedidos
router.get('/', (req, res) => {
    db.query('SELECT * FROM pedido', (err, results) => {
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
    db.query('SELECT * FROM pedido WHERE cliente_id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener los pedidos:', err);
            return res.status(500).json({ error: 'Error al obtener los pedidos' });
        }
        res.json(results);
    });
});

// Insertar un nuevo pedido
router.post('/', async (req, res) => {
    try {
        const id_pedido = await MaxIdPedido() + 1;
   
        const id_casa = await compareDireccion(req.body.direccion, req.body.id_cliente);

        const sql = 'INSERT INTO pedido (id_pedido,coste, cliente_id_cliente, casa_id_casa,tipo_pago) VALUES (?, ?, ?,?,?)';

        db.query(sql, [id_pedido, req.body.contenido.totalPrice, req.body.id_cliente, id_casa, req.body.tipo_pago], (err, result) => {
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
