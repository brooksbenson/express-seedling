const appRootPath = require("app-root-path");
const app = require("express")();

if (app.get("env") === "development") {
  require("dotenv").config({
    path: appRootPath + "/config/.env"
  });
}

// startup
const debug = require("debug")("startup:index");
require("express-async-errors");
require("./startup/db").init();
require("./startup/middleware").init(app);
require("./startup/routers").init(app);
require("./startup/views").init(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  debug(`Listening on port ${port}`);
});
