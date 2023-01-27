module.exports = app => {
    const user = require("../../controllers/user/user.controller.js");
    const keycloak = require('../../config/keycloak.config').initKeycloak();
    var router = require("express").Router();

    // get all user
   // router.get('/', keycloak.protect('realm:LIST_USER'), user.getAllUser);
    
    // get all user uipsa opr
    //router.get('/operator', keycloak.protect('realm:LIST_USER'), user.getOperator);
    // get specific user
    //router.get('/profile', keycloak.protect('realm:PROFILE'), user.getDetailUser);

    //router.put('/', keycloak.protect('realm:UPDATE_USER'), user.update);

    app.use('/api/user', router);
};
  