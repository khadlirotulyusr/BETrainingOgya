module.exports = (app) => {
    const usr = require("../../controllers/user-s/user-s.controller");

    var router = require("express").Router();

    app.use("/api/user/", router);

    router.get("/getAllUser", usr.getOptionsUser);
    // router.delete("/delete", mb.deleteMasterBank);
};
