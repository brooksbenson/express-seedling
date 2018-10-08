const morgan = require('morgan');
const helmet = require('helmet');
const { json, static } = require('express');
const appRootPath = require('app-root-path');
const debug = require('debug')('startup:middleware');

module.exports.init = function(app) {
  app.use(helmet());
  app.use(morgan('tiny'));
  app.use(static(appRootPath + '/public'));
  app.use(json());
};
