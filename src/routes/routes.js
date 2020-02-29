import { Router } from 'express';
import data from '../data.json';
const router = Router();

const cart = [];

// Obtiene todas las zonas
router.get('/zonas', (req, res) => {
  res.json(data.map(zona => zona));
});

// Obtiene todos los restaurantes por zona
router.get('/zonas/:zona/restaurantes', (req, res) => {
  const zonaParam = req.params.zona;
  if (zonaParam === 'norte') {
    res.json(data.find(zona => zona.zona === zonaParam).restaurantes);
  } else if (zonaParam === 'centro') {
    res.json(data.find(zona => zona.zona === zonaParam).restaurantes);
  } else {
    res.json({ error: 'Zona no valida' });
  }
});

// Retorna los platillos de un restaurante dado el id por url
router.get('/zonas/:zona/restaurantes/:id/platillos', (req, res) => {
  const zonaUrl = req.params.zona;
  const restauranteUrl = req.params.id;
  const zona = data.find(item => item.zona === zonaUrl);
  const restaurantes = zona.restaurantes;
  const restaurant = restaurantes.find(res => res.id === restauranteUrl);
  const platillos = restaurant.platillos;
  res.json(platillos);
});

// Añadir pedido de platillo
router.post('/pedidos', (req, res) => {
  const zonaParam = req.body.zona;
  const restauranteParam = req.body.restaurante;
  const platilloParam = req.body.platillo;
  const zona = data.find(zone => zone.zona === zonaParam);
  const restaurantes = zona.restaurantes.find(res => res.restaurante === restauranteParam);
  const platillo = restaurantes.platillos.find(plat => plat.platillo === platilloParam);

  cart.push(platillo);

  res.json(platillo);

  // if (!platillo) res.status(404).json({ error: 'No existe ese platillo' });
  // res.json(platillo);
});

module.exports = router;
