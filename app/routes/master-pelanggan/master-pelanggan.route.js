module.exports = (app) => {
    const mp = require("../../controllers/master-pelanggan/master-pelanggan.controller");

    var router = require("express").Router();

    app.use("/api/master-pelanggan/", router);
    router.get("/getPelangganAll",mp.getPelangganAll);
    router.post("/insertPelanggan", mp.insertPelanggan);
    router.put("/updatePelanggan", mp.updatePelanggan);
    router.delete("/deletePelanggan", mp.deletePelanggan);
};
