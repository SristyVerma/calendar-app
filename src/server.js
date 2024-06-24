const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/api/bookings', (req, res) => {
  const booking = req.body;
  router.db.get('bookings').push(booking).write();
  res.status(201).json(booking);
});

server.patch('/api/vendors/:id/availability', (req, res) => {
  const { id } = req.params;
  const { date, slot } = req.body;

  const vendor = router.db.get('vendors').find({ id: parseInt(id) }).value();
  if (vendor) {
    const availability = vendor.availability.find(avail => avail.date === date);
    if (availability) {
      availability.slots = availability.slots.filter(s => s !== slot);
      router.db.write();
    }
    res.status(200).json(vendor);
  } else {
    res.status(404).json({ error: "Vendor not found" });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
