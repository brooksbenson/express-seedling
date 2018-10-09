const mongoose = require('mongoose');
const Joi = require('joi');
const userSchema = require('./schemas/user');

module.exports.User = mongoose.model('User', userSchema);
module.exports.inputSchema = {
  name: Joi.string()
    .min(5)
    .max(50),
  email: Joi.string()
    .min(5)
    .max(50)
    .email(),
  password: Joi.string()
    .min(5)
    .max(50)
};
