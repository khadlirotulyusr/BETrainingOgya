module.exports = app => {
    const bonus = require("../../controllers/bonus/bonus.controller.js");
   // const keycloak = require('../../config/keycloak.config').initKeycloak();
    
    var router = require("express").Router();
  
     router.get("/",  bonus.getAll);
      
    app.use('/api/bonus/', router);
};
  