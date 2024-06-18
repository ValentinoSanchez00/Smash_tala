const db = require('../bd/db');
const { promisify } = require('util');
const queryAsync = promisify(db.query).bind(db);

async function actualizarPedidos() {
    try {
        const query = `
            UPDATE pedido
            SET entregado = 1
            WHERE entregado = 2 AND cambio_estado_programado <= NOW();
        `;
        const result = await queryAsync(query);
        console.log(`Pedidos actualizados: ${result.affectedRows}`);
    } catch (err) {
        console.error('Error al actualizar los pedidos:', err);
    }
}

// Ejecutar la función
actualizarPedidos();
