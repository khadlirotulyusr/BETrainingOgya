module.exports = (app) => {
    const trtk = require("../../controllers/transaksi-telkom/transaksi-telkom.controller");
    // const keycloak = require('../../config/keycloak.config').initKeycloak();
  
    var router = require("express").Router();
  
    // router.get("/", emp.getAll);
    // // router.get("/OrMysql",  emp.getOrMysqlAll)
    router.get("/getTrtk", trtk.getTrtk);
    router.get("/getOptionsTrnb", trtk.getOptionsTrtk);
    router.post("/insert", trtk.insertTransaksiTelkom);
  
    // //router.post("/",  emp.insertEmp);
    // router.put("/update", trnb.updateTrNasabah);
    // router.delete("/deleteEmp", emp.deleteEmp);
    app.use("/api/transaksi-telkom/", router);
  };