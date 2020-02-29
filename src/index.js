import express from 'express';
import routes from './routes/routes';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Variables globales

// Rutas
app.use('/api/', routes);

// Servidor
app.listen(process.env.PORT, () => {
  console.log('Server on port 4000');
});
