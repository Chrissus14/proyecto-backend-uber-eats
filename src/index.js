import express from 'express';
import routes from './routes/routes';
import restaurante from './routes/restaurante';
import dotenv from 'dotenv';
import datos from './datos';
const app = express();
dotenv.config();

const CLIENTE = express();
const RESTAURANTE = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Variables globales
const cart = [];
const compra = [];
const pedidos = [];
const pedidosTerminados = [];

// Rutas
app.use('/api', CLIENTE);
app.use('/api/restaurante', RESTAURANTE);

routes(CLIENTE, cart, compra, datos);
restaurante(RESTAURANTE, datos, compra, pedidos, pedidosTerminados);

// Servidor
app.listen(process.env.PORT, () => {
  console.log('Server on port 4000');
});
