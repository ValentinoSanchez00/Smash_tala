// ingredientesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../bd/db'); 

// Obtener todos los ingredientes
router.get('/', (req, res) => {
  db.query('SELECT * FROM ingrediente', (err, results) => {
    if (err) {
      console.error('Error al obtener los ingredientes:', err);
      return res.status(500).json({ error: 'Error al obtener los ingredientes' });
    }
    res.json(results);
  });
});

// Obtener un ingrediente por su ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM ingrediente WHERE id_ingrediente = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al obtener el ingrediente:', err);
      return res.status(500).json({ error: 'Error al obtener el ingrediente' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Ingrediente no encontrado' });
    }
    res.json(results[0]);
  });
});

// Obtener los alérgenos de un ingrediente por su ID
router.get('/:id/alergenos', (req, res) => {
  const { id } = req.params;
  db.query('SELECT a.* FROM alergenos a INNER JOIN ingrediente i ON a.id_alergeno = i.alergenos_id_alergeno WHERE i.id_ingrediente = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al obtener los alérgenos del ingrediente:', err);
      return res.status(500).json({ error: 'Error al obtener los alérgenos del ingrediente' });
    }
    res.json(results);
  });
});


// Crear un nuevo ingrediente
router.post('/', (req, res) => {
  const { nombre, kal, alergenos_id_alergeno } = req.body;
  db.query('INSERT INTO ingrediente (nombre, kal, alergenos_id_alergeno) VALUES (?, ?, ?)', [nombre, kal, alergenos_id_alergeno], (err, result) => {
    if (err) {
      console.error('Error al crear un nuevo ingrediente:', err);
      return res.status(500).json({ error: 'Error al crear un nuevo ingrediente' });
    }
    res.json({ message: 'Ingrediente creado exitosamente', id: result.insertId });
  });
});


// Actualizar un ingrediente existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, kal, alergenos_id_alergeno } = req.body;
  db.query('UPDATE ingrediente SET nombre = ?, kal = ?, alergenos_id_alergeno = ? WHERE id_ingrediente = ?', [nombre, kal, alergenos_id_alergeno, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar el ingrediente:', err);
      return res.status(500).json({ error: 'Error al actualizar el ingrediente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ingrediente no encontrado' });
    }
    res.json({ message: 'Ingrediente actualizado exitosamente' });
  });
});

// Eliminar un ingrediente
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM ingrediente WHERE id_ingrediente = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el ingrediente:', err);
      return res.status(500).json({ error: 'Error al eliminar el ingrediente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ingrediente no encontrado' });
    }
    res.json({ message: 'Ingrediente eliminado exitosamente' });
  });
});

module.exports = router;
