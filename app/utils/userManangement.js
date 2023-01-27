const axios = require('axios');

const keycloakAPI = `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}`;

const getDetailUser = async (authToken, idOperator) => {
    let tempResponse = {};
    try {
        let tempUser = await axios.get(`${keycloakAPI}/users/${idOperator}`, {
            headers: {
                Authorization: 'Bearer ' + authToken
            }
        });
        tempResponse.data = tempUser;
        tempResponse.message = "Status " + tempUser.status + " - " + tempUser.statusText;
    } catch (error) {
        tempResponse.statusCode = error.response.status;
        tempResponse.message = error.toString();
    }
    return tempResponse;
}

const getUsername = (user) => {
    return user.data ? user.data.data.username : '-';
}

module.exports = {
    getDetailUser,
    getUsername
}