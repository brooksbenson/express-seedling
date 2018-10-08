const express = require('express');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, inputSchema } = require('../models/User');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const input = _.pick(req.body, ['email', 'password']);
  const schema = _.pick(inputSchema, ['email', 'password']);
  await Joi.validate(input, schema);
  const user = await User.findOne({ email: input.email });
  if (!user) throw new Error('Invalid email or password');
  const validPassword = await bcrypt.compare(input.password, user.password);
  if (!validPassword) throw new Error('Invalid email or password');
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
});

module.exports = router;
