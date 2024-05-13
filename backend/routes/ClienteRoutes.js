const express = require('express');
const router = express.Router();
const db = require('../bd/db');

// Obtener todos los clientes
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM cliente';

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los clientes' });
    } else {
      res.json(result);
    }
  });
});

router.get('/comprobar', (req, res) => {
  const { correo, contraseña } = req.query;
  const sql = `SELECT * FROM cliente WHERE email = "${correo}" AND password = "${contraseña}"`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los clientes: '+err });
    } else {
      console.log(result);
      res.json(result);
    }
  });
});


// Agregar un nuevo cliente
router.post('/', (req, res) => {
  const { nombre, apellido, email, password } = req.body;
  let idUser = 0;

  MaxId()
    .then((id) => {
      console.log("El ID máximo encontrado es:", id);
      idUser = id+1;

      const sql = 'INSERT INTO cliente (id_cliente,nombre, apellido, email, password) VALUES (?, ?, ?, ?, ?)';

      db.query(sql, [idUser, nombre, apellido, email, password], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'Error al agregar el cliente' });
        } else {
          console.log(result);
          res.status(201).json({ message: 'Cliente agregado correctamente' });
        }
      });
    })
    .catch((error) => {
      console.error("Ocurrió un error al obtener el ID máximo:", error);
      res.status(500).json({ error: 'Error al obtener el ID máximo' });
    });
});

// Actualizar un cliente existente
router.put('/:id', (req, res) => {
  const clientId = req.params.id;
  const { nombre, email, password } = req.body;
  const sql = 'UPDATE cliente SET nombre = ?, email = ?, password = ? WHERE id_cliente = ?';

  db.query(sql, [nombre, email, password, clientId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al actualizar el cliente' });
    } else {
      res.json({ message: 'Cliente actualizado correctamente' });
    }
  });
});

// Eliminar un cliente
router.delete('/:id', (req, res) => {
  const clientId = req.params.id;
  const sql = 'DELETE FROM cliente WHERE id_cliente = ?';

  db.query(sql, [clientId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al eliminar el cliente' });
    } else {
      res.json({ message: 'Cliente eliminado correctamente' });
    }
  });
});

async function MaxId() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT MAX(id_cliente) AS id FROM cliente';
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.length > 0) {
          const id = result[0].id;
          console.log("Se devuelve la id:", id);
          resolve(id);
        } else {
          console.log("No se encontraron resultados.");
          resolve(null);
        }
      }
    });
  });
}

module.exports = router;
