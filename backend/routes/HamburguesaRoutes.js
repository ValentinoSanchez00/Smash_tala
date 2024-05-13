// hamburguesaRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../bd/db');

// Obtener todas las hamburguesas
router.get('/', (req, res) => {

 let searchTerm = req.query.searchTerm;

 if (!searchTerm) {

  db.query('SELECT * FROM hamburguesa', (err, results) => {
    if (err) {
      console.error('Error al obtener las hamburguesas:', err);
      return res.status(500).json({ error: 'Error al obtener las hamburguesas' });
    }
    res.json(results);
  });
}
else {
  db.query('SELECT * FROM hamburguesa WHERE nombre COLLATE utf8mb4_general_ci LIKE ?', [`%${searchTerm}%`], (err, result) => {
    if (err) {
        console.error('Error al buscar hamburguesas:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    } else {
        res.json(result);
    }
});


}
});

// Obtener una hamburguesa por su ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM hamburguesa WHERE id_hamburguesa = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al obtener la hamburguesa:', err);
      return res.status(500).json({ error: 'Error al obtener la hamburguesa' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Hamburguesa no encontrada' });
    }
    res.json(results[0]);
  });
});
router.get('/:id/ingredientes-alergenos', (req, res) => {
  const { id } = req.params;
  // Realiza la consulta a la base de datos para obtener los ingredientes de la hamburguesa con alérgenos
  db.query(`
    SELECT i.nombre AS ingrediente, a.tipo_alergeno AS alergeno
    FROM hamburguesa_tiene_ingrediente h
    JOIN ingrediente i ON h.ingrediente_id_ingrediente = i.id_ingrediente
    LEFT JOIN alergenos a ON i.alergenos_id_alergeno = a.id_alergeno
    WHERE h.hamburguesa_id_hamburguesa = ?
  `, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener ingredientes con alérgenos de la hamburguesa:', err);
      return res.status(500).json({ error: 'Error al obtener ingredientes con alérgenos de la hamburguesa' });
    }
    res.json(results);
  });
});


// Crear una nueva hamburguesa
router.post('/', (req, res) => {
  const { nombre, tipo, valor, coste, imagen } = req.body;
  db.query('INSERT INTO hamburguesa (nombre, tipo, valor, coste, imagen) VALUES (?, ?, ?, ?, ?)', [nombre, tipo, valor, coste, imagen], (err, result) => {
    if (err) {
      console.error('Error al crear una nueva hamburguesa:', err);
      return res.status(500).json({ error: 'Error al crear una nueva hamburguesa' });
    }
    res.json({ message: 'Hamburguesa creada exitosamente', id: result.insertId });
  });
});

// Actualizar una hamburguesa existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, valor, coste, imagen } = req.body;
  db.query('UPDATE hamburguesa SET nombre = ?, tipo = ?, valor = ?, coste = ?, imagen = ? WHERE id_hamburguesa = ?', [nombre, tipo, valor, coste, imagen, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar la hamburguesa:', err);
      return res.status(500).json({ error: 'Error al actualizar la hamburguesa' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Hamburguesa no encontrada' });
    }
    res.json({ message: 'Hamburguesa actualizada exitosamente' });
  });
});

// Eliminar una hamburguesa
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM hamburguesa WHERE id_hamburguesa = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar la hamburguesa:', err);
      return res.status(500).json({ error: 'Error al eliminar la hamburguesa' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Hamburguesa no encontrada' });
    }
    res.json({ message: 'Hamburguesa eliminada exitosamente' });
  });
});

module.exports = router;
