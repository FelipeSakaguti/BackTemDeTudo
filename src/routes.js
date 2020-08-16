const express = require('express');

const routes = express.Router();

routes.get('/vendedores', (request, response) => {
    console.log('Hellow World');

    return;
});

module.exports = routes;