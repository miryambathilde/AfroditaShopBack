const express = require('express');
const router = express.Router();

// api/products.js
// creamos ruta para vista publica de productos //
const apiProductsRouter = require('./api/products');
const apiPublicProductsRouter = require('./api/publicproducts')
const apiClientsRouter = require('./api/clients');
const apiUsersRouter = require('./api/users');
const { checkToken, checkAdmin, checkRole } = require('./middlewares');

// delegamos las queries al router de api/products.js //
// incluimos los middleware, ROLE ADMIN //
router.use('/products', checkToken, checkRole('A'), apiProductsRouter);
router.use('/public_products', apiPublicProductsRouter);
router.use('/clients', checkToken, checkAdmin, apiClientsRouter);
router.use('/users', apiUsersRouter);

module.exports = router;
