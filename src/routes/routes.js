import { Router } from 'express';
import data from '../data.json';
const router = Router();

const cart = [];
const compra = [];

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

  const pedido = {
    id: cart.length + 1,
    platilloSelect: platillo.platillo
  };
  cart.push(pedido);

  res.json(pedido);
});

// Quitar platillo del carrito con su id
router.get('/deseleccionar/:id', (req, res) => {
  const id = req.params.id;
  const quitar = cart.find(item => item.id === +id);
  const indice = cart.indexOf(quitar);
  const platilloEliminado = cart.splice(indice, 1);
  res.json({ eliminado: platilloEliminado });
});

// Obtiene todos los platillos del carrito
router.get('/micarrito', (req, res) => {
  if (cart.length === 0) res.status(404).json({ error: 'No tienes pedidos aun' });
  res.json(cart);
});

// Borrar elementos del array, cancelar pedido
router.get('/cancelar', (req, res) => {
  cart.splice(0);
  res.json({ cancel: 'Pedido cancelado' });
});

//
router.get('/confirmar', (req, res) => {
  compra.push(cart);
  res.json({ status: 'confirmado', pedidos: compra });
  cart.splice(0);
});

module.exports = router;
