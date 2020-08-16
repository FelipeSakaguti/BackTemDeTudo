const express = require('express');

const VendedoresController = require('./controllers/VendedoresConstroller');
const VendedorController = require('./controllers/VendedorController');
const ClienteListConstroller = require('./controllers/ClienteListController');
const ClienteController = require('./controllers/ClienteController');

const routes = express.Router();

routes.get('/vendedores', VendedoresController.index );

routes.post('/vendedor', VendedorController.create );
routes.put('/vendedor', VendedorController.update );
routes.get('/vendedor', VendedorController.index );
routes.delete('/vendedor', VendedorController.delete );

routes.get('/clientes', ClienteListConstroller.index );
routes.post('/clientes/', ClienteController.create );
routes.put('/clientes/:id/', ClienteController.update );
routes.get('/clientes/:id/', ClienteController.index );
routes.delete('/clientes/:id/', ClienteController.delete );


module.exports = routes;