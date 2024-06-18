const express = require('express');
const router = express.Router();
const db = require('../bd/db'); 

const getOffset = (page, limit) => (page - 1) * limit;

router.get('/', (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = getOffset(page, limit);

    db.query('SELECT COUNT(*) AS totalCount FROM log', (err, countResults) => {
        if (err) {
            console.error('Error al obtener el total de logs:', err);
            return res.status(500).json({ error: 'Error al obtener el total de logs' });
        }
        const totalCount = countResults[0].totalCount;

        db.query('SELECT * FROM log LIMIT ?, ?', [offset, limit], (err, results) => {
            if (err) {
                console.error('Error al obtener los logs:', err);
                return res.status(500).json({ error: 'Error al obtener los logs' });
            }
            res.json({ logs: results, totalCount });
        });
    });
});

router.get('/mes', (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = getOffset(page, limit);

    const countQuery = `
        SELECT COUNT(*) AS totalCount 
        FROM log 
        WHERE MONTH(fecha) = MONTH(CURDATE()) 
        AND YEAR(fecha) = YEAR(CURDATE())
    `;

    const dataQuery = `
        SELECT * 
        FROM log 
        WHERE MONTH(fecha) = MONTH(CURDATE()) 
        AND YEAR(fecha) = YEAR(CURDATE())
        LIMIT ?, ?
    `;

    db.query(countQuery, (err, countResults) => {
        if (err) {
            console.error('Error al obtener el total de logs:', err);
            return res.status(500).json({ error: 'Error al obtener el total de logs' });
        }
        const totalCount = countResults[0].totalCount;

        db.query(dataQuery, [offset, limit], (err, results) => {
            if (err) {
                console.error('Error al obtener los logs:', err);
                return res.status(500).json({ error: 'Error al obtener los logs' });
            }
            res.json({ logs: results, totalCount });
        });
    });
});

module.exports = router;
