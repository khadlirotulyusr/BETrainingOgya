module.exports = (app) => {
    const hstnb = require("../../controllers/history-nasabah/history-nasabah.controller");
    // const keycloak = require('../../config/keycloak.config').initKeycloak();
  
    var router = require("express").Router();
  
    // router.get("/", emp.getAll);
    // // router.get("/OrMysql",  emp.getOrMysqlAll)
    router.get("/getHstnb", hstnb.getHstnb);
    router.post("/insertHistnb", hstnb.insertHistoryNasabah);
    
  
    // //router.post("/",  emp.insertEmp);
    // router.put("/update", trnb.updateTrNasabah);
    // router.delete("/deleteEmp", emp.deleteEmp);
    app.use("/api/history-nasabah/", router);
  };
  