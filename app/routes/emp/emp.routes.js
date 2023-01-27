module.exports = app => {
    const emp = require("../../controllers/emp/emp.controller.js");
   // const keycloak = require('../../config/keycloak.config').initKeycloak();
    
    var router = require("express").Router();
  
     router.get("/",  emp.getAll);
     router.get("/OrMysql",  emp.getOrMysqlAll)
     router.get("/OrOracle",  emp.getOrOrcleAll)
     router.get("/getOptionsAll",  emp.getOptionsAll)

     
     router.post("/",  emp.insertEmp);
     router.put("/",  emp.updateEmp); 
    app.use('/api/emp/', router);
};