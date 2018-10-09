const routeError = require("../middleware/route-error");

const routes = "../routes/";
exports.init = function(app) {
  require("express-async-errors");
  app.use("/api/users", require(routes + "users"));
  app.use("/api/auth", require(routes + "auth"));
  app.use(routeError);
};
