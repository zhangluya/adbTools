'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/maintApi', controller.home.maintApi);
  router.post('/maintApi', controller.home.maintApi);
};
