const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('startup:db');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

module.exports.init = function() {
  const connectionString = config.get('dbConnectionString');
  if (!connectionString) {
    throw new Error(
      'Environment binding "app_db_connection_string" was not set'
    );
  }

  mongoose
    .connect(
      connectionString,
      { useNewUrlParser: true }
    )
    .then(() => debug('db connection successful'));
};
