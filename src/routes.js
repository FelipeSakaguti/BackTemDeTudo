const express = require('express');

const VendedoresController = require('./controllers/VendedoresConstroller');
const VendedorController = require('./controllers/VendedorController');

const routes = express.Router();

routes.get('/vendedores', VendedoresController.index );

routes.post('/vendedor', VendedorController.create );
routes.put('/vendedor', VendedorController.update );
routes.get('/vendedor', VendedorController.index );
routes.delete('/vendedor', VendedorController.delete );

module.exports = routes;