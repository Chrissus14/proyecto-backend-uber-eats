import express from 'express';
import routes from './routes/routes';
import cliente from './routes/cliente';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Variables globales
export const cart = [];
export const compra = [];

// Rutas
app.use('/api', cliente);

// Servidor
app.listen(process.env.PORT, () => {
  console.log('Server on port 4000');
});
