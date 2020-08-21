const express = require('express');

const VendedoresController = require('./controllers/VendedoresController');
const VendedorController = require('./controllers/VendedorController');
const ClienteListController = require('./controllers/ClienteListController');
const ClienteController = require('./controllers/ClienteController');
const ProdutoController = require('./controllers/ProdutoController');
const ProdutoListController = require('./controllers/ProdutoListController');
const VendaController = require('./controllers/VendaController');
const VendaListController = require('./controllers/VendaListController');
const DashboardController = require('./controllers/DashboardController');

const routes = express.Router();

routes.get('/vendedores', VendedoresController.index );
routes.get('/vendedores/:id', VendedorController.index );
routes.post('/vendedores', VendedorController.create );
routes.put('/vendedores/:id', VendedorController.update );
routes.delete('/vendedores/:id', VendedorController.delete );

routes.get('/clientes', ClienteListController.index );
routes.get('/clientes/:id/', ClienteController.index );
routes.post('/clientes/', ClienteController.create );
routes.put('/clientes/:id/', ClienteController.update );
routes.delete('/clientes/:id/', ClienteController.delete );

routes.get('/produtos', ProdutoListController.index );
routes.get('/produtos/:id/', ProdutoController.index );
routes.post('/produtos/', ProdutoController.create );
routes.put('/produtos/:id/', ProdutoController.update );
routes.delete('/produtos/:id/', ProdutoController.delete );

routes.get('/vendas', VendaListController.index );
routes.get('/vendas/:id/', VendaController.index );
routes.post('/vendas/', VendaController.create );
routes.put('/vendas/:id/', VendaController.update );
routes.delete('/vendas/:id/', VendaController.delete );

routes.get('/dash/bestSeller', DashboardController.bestSeller );
routes.get('/dash/bestCustomer', DashboardController.bestCustomer );

module.exports = routes;