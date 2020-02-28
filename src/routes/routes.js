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

router.get('/restaurantes/:zona', (req, res) => {
  const zonaParam = req.params.zona;
  // const restaurantes = data.find(zona => zona.zona === zonaParam).restaurantes;
  if (zonaParam === 'norte') {
    res.json(data.find(zona => zona.zona === zonaParam).restaurantes);
  } else if (zonaParam === 'centro') {
    res.json(data.find(zona => zona.zona === zonaParam).restaurantes);
  } else {
    res.json({ error: 'Zona no valida' });
  }
});

module.exports = router;
