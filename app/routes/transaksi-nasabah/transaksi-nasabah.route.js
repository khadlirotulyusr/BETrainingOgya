module.exports = (app) => {
    const trnb = require("../../controllers/transaksi-nasabah/transaksi-nasabah.controller");
    // const keycloak = require('../../config/keycloak.config').initKeycloak();
  
    var router = require("express").Router();
  
    // router.get("/", emp.getAll);
    // // router.get("/OrMysql",  emp.getOrMysqlAll)
    router.get("/getTrnb", trnb.getTrnb);
    router.get("/getOptionsTrnb", trnb.getOptionsTrnb);
    router.post("/insert", trnb.insertTransaksiNasabah);
  
    // //router.post("/",  emp.insertEmp);
    // router.put("/update", trnb.updateTrNasabah);
    // router.delete("/deleteEmp", emp.deleteEmp);
    app.use("/api/transaksi-nasabah/", router);
  };
  