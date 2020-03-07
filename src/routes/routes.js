export default (CLIENTE, cart, compra, datos) => {
  // Ver platillos por restaurante utlizando query string
  // @route   GET   /api/platillos
  //@route    GET   /api/platillos?restaurante=xxx
  CLIENTE.get('/platillos', (req, res) => {
    if (req.query.restaurante) {
      const restaurante = datos.platillos.filter(
        platillo => platillo.restaurante === req.query.restaurante
      );
      return res.json(restaurante);
    }
    res.json(datos.platillos);
  });

  // Ver restaurantes por zona
  // @route   GET   /api/restaurantes/:zona
  CLIENTE.get('/restaurantes/:zona', (req, res) => {
    if (!req.params.zona) return res.json({ error: 'Zona no encontrada' });
    res.json(datos.platillos.filter(zona => zona.zona === req.params.zona));
  });

  // Seleccionar platillos
  // @route   POST   /api/seleccionar
  CLIENTE.post('/seleccionar', (req, res) => {
    const platilloSeleccionado = req.body.platillo;

    if (!platilloSeleccionado || !req.body.restaurante)
      return res.status(400).json({ error: 'debes ingresar un platillo y un restaurante' });

    if (!datos.platillos.some(platillo => platillo.nombre === platilloSeleccionado))
      return res.status(404).json({ error: 'platillo no encontrado' });

    if (!datos.platillos.some(platillo => platillo.restaurante === req.body.restaurante))
      return res.status(404).json({ error: 'restaurante no valido' });

    if (!datos.platillos.some(platillo => platillo.costo === +req.body.costo))
      return res.status(404).json({ error: 'costo incorrecto' });

    const pedido = {
      id: cart.length + 1,
      platillo: platilloSeleccionado,
      restaurante: req.body.restaurante,
      costo: +req.body.costo
    };

    cart.push(pedido);
    // console.log(cart);

    res.json({
      status: 'ok',
      platillo: pedido.platillo,
      restaurante: pedido.restaurante,
      costo: pedido.costo
    });
  });

  // Deseleccionar platillo
  //@route DELETE   /api/deseleccionar/:id
  CLIENTE.delete('/deseleccionar/:id', (req, res) => {
    if (!cart.some(platillo => platillo.id === +req.params.id))
      return res.status(404).json({ error: 'platillo no encontrado' });

    const plato = cart.find(platillo => platillo.id === +req.params.id);
    const index = cart.indexOf(plato);
    cart.splice(index, 1);
    console.log(cart);
    res.json({ msj: 'platillo eliminado satisfactoriamente' });
  });

  // Obtiene todos los platillos del carrito (checkout del pedido)
  // @route   GET /api/micarrito
  CLIENTE.get('/micarrito', (req, res) => {
    if (cart.length === 0) return res.status(404).json({ error: 'No tienes pedidos aun' });
    res.json(cart);
  });

  // Borrar elementos del array, cancelar pedido
  // @route   GET   /api/cancelar
  CLIENTE.get('/cancelar', (req, res) => {
    cart.splice(0);
    res.json({ cancel: 'Pedido cancelado' });
  });

  // Confirma la compra, añade los items a un nuevo array y elimina los items del carrito
  //@route    GET   /api//confirmar
  CLIENTE.get('/confirmar', (req, res) => {
    compra.push(...cart);
    res.json({ status: 'confirmado', pedidos: compra });
    cart.splice(0);
  });
};
