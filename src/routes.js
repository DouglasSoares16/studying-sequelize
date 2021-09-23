const express = require("express");

// controllers
const UserController = require("./controllers/UserController");
const AddressController = require("./controllers/AddressController");
const TechController = require("./controllers/TechController");
const ReportController = require("./controllers/ReportController");

const routes = express.Router();

routes.post("/users", UserController.create);
routes.get("/users", UserController.index);

routes.post("/users/:user_id/addresses", AddressController.create);
routes.get("/users/:user_id/addresses", AddressController.index);

routes.post("/users/:user_id/techs", TechController.create);
routes.get("/users/:user_id/techs", TechController.index);
routes.delete("/users/:user_id/techs", TechController.delete);

routes.get("/report", ReportController.show);

module.exports = routes;