module.exports = (app) => {
    const hstTlkm = require("../../controllers/history_telkom/history-telkom.controller");
    // const keycloak = require('../../config/keycloak.config').initKeycloak();
  
    var router = require("express").Router();
  
    // router.get("/", emp.getAll);
    // // router.get("/OrMysql",  emp.getOrMysqlAll)
    router.get("/getHstTlkm", hstTlkm.getHstTlkm);
    // router.post("/insertHistnb", hstnb.insertHistoryNasabah);
    
  
    // //router.post("/",  emp.insertEmp);
    // router.put("/update", trnb.updateTrNasabah);
    // router.delete("/deleteEmp", emp.deleteEmp);
    app.use("/api/history-telkom/", router);
  };
  