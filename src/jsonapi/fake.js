const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Path to your database file
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors, and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// Use default router
server.use('/api', router); // All routes will be prefixed with /api

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});