const express = require('express');
const cors = require('cors');
const clienteRoutes = require('./routes/ClienteRoutes');
const hamburguesaRoutes = require('./routes/HamburguesaRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/cliente', clienteRoutes);
app.use('/hamburguesa', hamburguesaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en funcionamiento en el puerto ${PORT}`));
