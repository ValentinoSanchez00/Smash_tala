const express = require('express');
const router = express.Router();
const db = require('../bd/db'); 

router.get('/', (req, res) => {
    db.query('SELECT * FROM log', (err, results) => {
        if (err) {
            console.error('Error al obtener los logs:', err);
            return res.status(500).json({ error: 'Error al obtener los logs' });
        }
        res.json(results);
    });
});


module.exports = router;