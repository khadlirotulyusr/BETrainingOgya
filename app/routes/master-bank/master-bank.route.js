module.exports = (app) => {
    const mb = require("../../controllers/master-bank/master-bank.controller");

    var router = require("express").Router();

    app.use("/api/master-bank/", router);

    router.get("/getMasterBank", mb.getMasterBank);
    router.get("/getOptionsMasterBank", mb.getOptionsMasterBank);
    router.post("/insert", mb.insertMasterBank);
    router.put("/update", mb.updateMasterBank);
    router.delete("/delete", mb.deleteMasterBank);
};
