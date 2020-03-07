export default (REPARTIDOR, datos, pedidosTerminados, entregas) => {
  // Ver lista de pedidos
  // @route GET  /api/repartidor/pedidos
  // @route GET  /api/repartidor/pedidos?aceptar=aceptar
  // @route GET  /api/repartidor/pedidos?rechazar=rechazar
  REPARTIDOR.get('/pedidos', (req, res) => {
    if (pedidosTerminados.length === 0) return res.json({ msg: 'Aún no tienes pedidos' });

    if (req.query.aceptar === 'aceptar') {
      entregas.push(...pedidosTerminados);
      pedidosTerminados.splice(0);
      return res.json({ status: 'pedidos aceptados', pedidos: entregas });
    }

    if (req.query.rechazar === 'rechazar') return res.json({ msg: 'Envios rechazados' });

    res.json(pedidosTerminados);
  });

  // Ver pedido actual
  // @route  GET /api/repartidor/entregas
  // @route  GET /api/repartidor/entregas?finalizar=true
  REPARTIDOR.get('/entregas', (req, res) => {
    if (entregas.length === 0) return res.json({ msg: 'Aún no tienes entregas' });

    if (req.query.finalizar === 'true') {
      entregas.splice(0);
      return res.json({ status: 'terminado', msg: 'Haz finalizado las entregas' });
    }

    res.json(entregas);
  });
};
