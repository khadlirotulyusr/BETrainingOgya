var Keycloak = require('keycloak-connect')

var keycloak;

const keycloakConfig = {
    "realm": process.env.KEYCLOAK_REALM,
    "resource": process.env.KEYCLOAK_CLIENTID,
    "auth-server-url": process.env.KEYCLOAK_URL,
    "bearer-only": process.env.KEYCLOAK_BEARER_ONLY,
    "ssl-required": process.env.KEYCLOAK_SSL_REQUIRED,
  };

let initKeycloak = (memoryStore) => {
    if(keycloak) {
        return keycloak
    } else {
        console.log('Initialize Keycloak . . .')
        
        keycloak = new Keycloak({
            store: memoryStore
        }, keycloakConfig);
        return keycloak
    }
}

module.exports = {
    initKeycloak
}