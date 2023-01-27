const jsonMessage = require("../../json/jsonMessage");
const axios = require('axios');

const getOperatorWH = (req) => {
    return axios.get(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/groups/${process.env.KEYCLOAK_GROUP_OPERATOR_WH}/members`, {
        headers: {
            Authorization: 'Bearer ' + req.kauth.grant.access_token.token
        }
    })
}

const getUipsaOpr = (req) => {
    return axios.get(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/groups/${process.env.KEYCLOAK_GROUP_UIPSA_OPR}/members`, {
        headers: {
            Authorization: 'Bearer ' + req.kauth.grant.access_token.token
        }
    })
}

const mappingDropdownData = (data) => {
    let newData = data.map(user => {
        return Object.assign({},{
            name:`${user.firstName} ${user.lastName ? user.lastName : ''}`,
            id:user.id
        })
    })
    return newData;
}

const mappingUserWSIDRegistration = (data, group) => {
    let newData = data.map(user => {
        return Object.assign({},{
            name:`${user.firstName} ${user.lastName ? user.lastName : ''}`,
            id:user.id,
            group : group
        })
    })
    return newData;
}

async function getAllUser(req, res) {
    const id_warehouse = req.query.id_warehouse;
    try {
        const name = req.kauth.grant.access_token.content.preferred_username || null;
        if(name === null) {
            let message={
                "english" : 'You are not Authorized' ,
                "indonesia" : `Anda Tidak Memiliki Hak Akses`,
            }
            res.send(jsonMessage.jsonSuccess(message, []));
        } else {
            let result = await getOperatorWH(req);
            let data = result.data.filter(item => item.attributes !== undefined && item.attributes.id_warehouse !== undefined && item.attributes.id_warehouse.includes(id_warehouse))
            const newData = mappingDropdownData(data)
            let message = {
                "english" : `Successfully Retrieved Operator Data` ,
                "indonesia" : `Berhasil Mengambil Data Operator`,
            }
            res.send(jsonMessage.jsonSuccess(message, newData));
        }
    } catch(err) {
        const errMessage = err.message || "Some error occurred while get On Progress Purchase Order SPV";
        if(err.original !== undefined) {
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
        }
    }
}
module.exports.getAllUser = getAllUser;

function capitalizeUserFullName (firstName, lastName){
    const str = `${firstName} ${lastName}`.toLowerCase();
    const arr = str.split(" ");
    for(var i=0; i<arr.length; i++)
    {
        arr[i]= arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    return arr.join(" ");
}

exports.getDetailUser = async (req, res) => {
    try {
        const user_id = req.kauth.grant.access_token.content.sub;
        let result = await axios.get(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${user_id}`, {
            headers: {
                Authorization: 'Bearer ' + req.kauth.grant.access_token.token //the token is a variable which holds the token
            }
        })
        const data = Object.assign({},{
            "full_name":capitalizeUserFullName(result.data.firstName ? result.data.firstName : '', result.data.lastName ?  result.data.lastName : ''),
            "username":result.data.username,
            "email":result.data.email,
            "attributes":result.data.attributes
        });
        let message = {
            "english" : `Successfully Retrieving detail user data` ,
            "indonesia" : `Berhasil Mengambil Data detail user`,
        }
        res.send(jsonMessage.jsonSuccess(message, data));
    } catch(err) {
        const errMessage = err.message || "Some error occurred while get detail user data";
        if(err.original !== undefined) {
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
        }
    }
}

exports.getOperator = async (req, res) => {
    const task_type = req.query.task_type;
    const id_warehouse = req.query.id_warehouse;

    try {
        const name = req.kauth.grant.access_token.content.preferred_username || null;

        if(name === null) {
            let message={
                "english" : 'You are not Authorized' ,
                "indonesia" : `Anda Tidak Memiliki Hak Akses`,
            }
            res.send(jsonMessage.jsonSuccess(message, []));
        } else {
            const temp = await getUipsaOpr(req)
            let dataUipsaOpr = mappingUserWSIDRegistration(temp.data, "UIPSA_OPERATOR")

            let dataOperatorWh = [];
            if(task_type.toLowerCase() === ("Registrasi WSID").toLowerCase()){
                const tempOprWH = await getOperatorWH(req)
                dataOperatorWh = tempOprWH.data.filter(item => item.attributes !== undefined && item.attributes.id_warehouse !== undefined && item.attributes.id_warehouse.includes(id_warehouse))
                dataOperatorWh = mappingUserWSIDRegistration(dataOperatorWh, "OPERATOR_WH")
            }

            const newData = [...dataUipsaOpr, ...dataOperatorWh]
            let message = {
                "english" : `Successfully Retrieving list operator WH` ,
                "indonesia" : `Berhasil Mengambil Data list operator WH`,
            }
            res.send(jsonMessage.jsonSuccess(message, newData));
        }
    } catch(err) {
        const errMessage = err.message || "Some error occurred while get list operator WH";
        if(err.original !== undefined) {
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
        }
    }
}

exports.update = async (req, res) => {
    try {
        const name = req.kauth.grant.access_token.content.preferred_username || null;
        if(name === null) {
            let message={
                "english" : 'You are not Authorized' ,
                "indonesia" : `Anda Tidak Memiliki Hak Akses`,
            }
            res.send(jsonMessage.jsonSuccess(message, []));
        } else {
            // Hit Keycloak to get all user
            const user_id = req.kauth.grant.access_token.content.sub;
            const getRequiredActions = await axios.get(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${user_id}`, {
                headers: {
                    Authorization: 'Bearer ' + req.kauth.grant.access_token.token //the token is a variable which holds the token
                },

            })
            if(getRequiredActions.status === 200){
                let userAction = getRequiredActions.data.requiredActions;
                userAction.push("UPDATE_PASSWORD")
                const updateUser = {
                    "requiredActions" : userAction
                }

                const updatePassword = await axios.put(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${user_id}`, updateUser, {
                    headers: {
                        Authorization: 'Bearer ' + req.kauth.grant.access_token.token //the token is a variable which holds the token
                    },

                })
                if(updatePassword.status === 200 || updatePassword.status === 204){
                    let message = {
                        "english" : `Successfully updating user data` ,
                        "indonesia" : `Berhasil Mengupdate user data`,
                    }
                    res.send(jsonMessage.jsonSuccess(message, true));
                }
            }
        }
    } catch(err) {
        const errMessage = err.message || "Some error occurred while updating user data";
        if(err.original !== undefined) {
            res.status(401).send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
        } else {
            res.status(401).send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
        }
    }
};

const getName = async (id, token) => {
    const user = await axios.get(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${id}`, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
        },
    })
    const name = `${user.data.firstName === undefined ? '' : user.data.firstName} ${user.data.lastName ? user.data.lastName : ''}`;
    return name
}
module.exports.getName = getName