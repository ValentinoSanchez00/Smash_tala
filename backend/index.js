const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const cron = require('node-cron');
const clienteRoutes = require('./routes/ClienteRoutes');
const hamburguesaRoutes = require('./routes/HamburguesaRoutes');
const alergenoRoutes = require('./routes/AlergenoRoutes');
const ingredienteRoutes = require('./routes/IngredienteRoutes');
const pedidoRoutes = require('./routes/PedidoRoutes');
const logRoutes = require('./routes/LogRoutes');
const db = require('./bd/db'); // Asumiendo que aquí está la conexión a la base de datos

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
});

// Middleware
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rutas
app.use('/cliente', clienteRoutes);
app.use('/hamburguesa', hamburguesaRoutes);
app.use('/alergenos', alergenoRoutes);
app.use('/ingredientes', ingredienteRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/log', logRoutes);

// Socket.IO
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Emitir actualizaciones de pedidos cada 5 segundos
setInterval(async () => {
  try {
    const pedidos = await obtenerPedidos();
    io.emit('updatePedidos', pedidos);
  } catch (error) {
    console.error('Error al emitir actualización de pedidos:', error);
  }
}, 5000);

// Función para obtener todos los pedidos
async function obtenerPedidos() {
  return new Promise((resolve, reject) => {
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
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Cron job para actualizar pedidos cada minuto
cron.schedule('* * * * *', async () => {
  console.log('Ejecutando cron job para actualizar pedidos...');
  try {
    await actualizarPedidos();
    const pedidos = await obtenerPedidos();
    io.emit('updatePedidos', pedidos);
  } catch (error) {
    console.error('Error al ejecutar cron job:', error);
  }
});

// Función para actualizar los pedidos cuyo tiempo de cambio ya ha pasado
async function actualizarPedidos() {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE pedido
      SET entregado = 1
      WHERE entregado = 2 AND cambio_estado_programado <= NOW();
    `;
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Pedidos actualizados: ${result.affectedRows}`);
        resolve(result);
      }
    });
  });
}

// Puerto de escucha
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
