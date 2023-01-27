module.exports = app => {
    const job = require("../../controllers/job/job.controller.js");
   // const keycloak = require('../../config/keycloak.config').initKeycloak();
    
    var router = require("express").Router();
  
     router.get("/getAllJobForOption",  job.getAllJobForOption);
    app.use('/api/job/', router);
};