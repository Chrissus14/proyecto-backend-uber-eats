import { Router } from 'express';
import data from '../data.json';
const router = Router();

router.get('/', (req, res) => {
  res.json(data);
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.send('Recibido');
});

module.exports = router;
