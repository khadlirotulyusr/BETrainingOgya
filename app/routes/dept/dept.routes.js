module.exports = (app) => {
  const dept = require("../../controllers/dept/dept.controller.js");
  // const keycloak = require('../../config/keycloak.config').initKeycloak();

  var router = require("express").Router();
  router.get("/", dept.getAllDeptForOption);
  router.get("/find-all", dept.getAllDeptForOption);
  app.use("/api/dept/", router);
};
