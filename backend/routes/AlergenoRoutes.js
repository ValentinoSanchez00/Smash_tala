const express = require('express');
const router = express.Router();
const db = require('../bd/db');

// Obtener todos los alergenos
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM alergenos';
  
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al obtener los alergenos' });
      } else {
        res.json(result);
      }
    });
  });



module.exports = router;