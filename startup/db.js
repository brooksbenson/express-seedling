const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('startup:db');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

module.exports.init = function() {
  const u = config.get('db_user');
  const p = config.get('db_password');
  if (!u || !p) {
    throw new Error(
      'The database username and/or password was not set in the environment'
    );
  }

  const connectionString = `mongodb://${u}:${p}@ds045107.mlab.com:45107/express-seed`;
  mongoose
    .connect(
      connectionString,
      { useNewUrlParser: true }
    )
    .then(() => debug('db connection successful'));
};
