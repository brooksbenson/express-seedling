const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('Access denied.');
  }

  const jwtPrivateKey = config.get('jwtPrivateKey');
  try {
    const user = jwt.verify(token, jwtPrivateKey);
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token');
  }
};
