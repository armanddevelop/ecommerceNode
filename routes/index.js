const express = require('express');
const routerProducts = require('./productsRoute');
const routerUsers = require('./usersRoute');
const routeCategories = require('./categoriesRoute');

const routerApi = (app) => {
  const router = express.Router();
  /*master route */
  app.use('/api/v1', router);
  /*other routes */
  router.use('/products', routerProducts);
  router.use('/users', routerUsers);
  router.use('/categories', routeCategories);
};

module.exports = routerApi;
