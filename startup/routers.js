const routes = '../routes/';
exports.init = function(app) {
  app.use('/api/users', require(routes + 'users'));
  app.use('/api/auth', require(routes + 'auth'));
};
