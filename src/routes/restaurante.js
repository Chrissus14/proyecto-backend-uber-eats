export default (RESTAURANTE, datos, compra, pedidos, pedidosTerminados) => {
  // ver pedidos por aceptar
  // @route  GET   /api/restaurante/pedido
  // @route  GET  /api/restaurante/pedido?aceptar=aceptar
  // @route  GET  /api/restaurante/pedido?rechazar=rechazar
  RESTAURANTE.get('/pedido', (req, res) => {
    if (compra.length === 0) return res.json({ msn: 'No hay pedidos aun' });

    if (req.query.aceptar === 'aceptar') {
      pedidos.push(...compra);
      compra.splice(0);
      // console.log(pedidos);
      return res.json({ platillos: 'Platillos aceptados' });
    }

    if (req.query.rechazar === 'rechazar') {
      return res.json({ platillos: 'Platillos rechazados' });
    }

    res.json(compra);
  });

  // Terminar pedido
  // @route GET /api/restaurante/terminados
  RESTAURANTE.get('/terminados', (req, res) => {
    pedidosTerminados.push(...pedidos);
    pedidos.splice(0);
    // console.log(pedidosTerminados);

    if (pedidosTerminados.length === 0)
      return res.json({ pedidos: 'Aun no hay pedidos terminados' });

    res.json({ msg: 'Pedidos enviados al repartidos' });
  });

  // Agregar nuevo platillo
  // @route  POST  /api/restaurante/agregar
  RESTAURANTE.post('/agregar', (req, res) => {
    const platillo = {
      id: String(datos.platillos.length + 1),
      ...req.body
    };

    datos.platillos.push(platillo);
    res.json(datos.platillos);
  });

  // Acutalizar platillo
  // @route /api/restaurante/modificar/:id
  RESTAURANTE.put('/modificar/:id', (req, res) => {
    const plato = datos.platillos.find(platillo => platillo.id === req.params.id);
    plato.nombre = req.body.name;
    plato.restaurante = req.body.restaurante;
    plato.zona = req.body.zona;

    res.json(plato);
  });

  RESTAURANTE.delete('/eliminar/:id', (req, res) => {
    const platillo = datos.platillos.find(p => p.id === req.params.id);
    if (platillo) {
      datos = datos.platillos.filter(p => p.id !== req.params.id);
      return res.json(datos.platilos);
    }
  });
};
