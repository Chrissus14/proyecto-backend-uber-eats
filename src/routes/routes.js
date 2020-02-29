import { Router } from 'express';
import data from '../data.json';
const router = Router();

/**
  const zona = data.find(zona => zona.id === '1');
  const restaurantes = zona.restaurantes;
  const restaurant = restaurantes.find(res => res.id === '1');
  const platillos = restaurant.platillos;
  const platillo = platillos.find(plat => plat.id === '1');
 */
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

module.exports = router;
