module.exports = (app) => {
  const emp = require("../../controllers/emp/emp.controller.js");
  // const keycloak = require('../../config/keycloak.config').initKeycloak();

  var router = require("express").Router();

  router.get("/", emp.getAll);
  // router.get("/OrMysql",  emp.getOrMysqlAll)
  router.get("/getEmp", emp.getEmp);
  router.get("/getOptionsEmp", emp.getOptionsEmp);
  router.post("/insertEmp", emp.insertEmp);

  //router.post("/",  emp.insertEmp);
  router.put("/updateEmp", emp.updateEmp);
  router.delete("/deleteEmp", emp.deleteEmp);
  app.use("/api/emp/", router);
};
