const jsonSuccess = (msg,data) => {
    
    const message={
        "error_code" : "Ogya-00",
        "error_message" : msg,
        "data":data,
    }
    return message;
}
module.exports.jsonSuccess = jsonSuccess;

const jsonFailed = (code, errno, errMessage, errCode) => {
    const message={
        "error_code" : `OGYA-${errCode}`,
        "error_message" :{
            code: code,
            errno: errno,
            message: errMessage,
        },
    }
    return message;
}
module.exports.jsonFailed = jsonFailed;

// switch(status){
//     case 400:
//         Object.assign(message, {"error_message":"Bad Request"})
//         break;
//     case 401:
//         Object.assign(message, {"error_message":"Unauthorized"})
//         break;
//     case 403:
//         Object.assign(message, {"error_message":"Forbidden"})
//         break;
//     case 404:
//         Object.assign(message, {"error_message":"Not Found"})
//         break;
//     case 405:
//         Object.assign(message, {"error_message":"Method Not Allowed"})
//         break;
//     case 408:
//         Object.assign(message, {"error_message":"Request Timeout"})
//         break;
//     case 409:
//         Object.assign(message, {"error_message":"Conflict"})
//         break;
//     case 500:
//         Object.assign(message, {"error_message":"Internal Server Error"})
//         break;
//     case 502:
//         Object.assign(message, {"error_message":"Bad Gateway"})
//         break;
//     case 503:
//         Object.assign(message, {"error_message":"Service Unavailable"})
//         break;
//     case 599:
//         Object.assign(message, {"error_message":"Network Connect Timeout Error"})
//         break;
//     default: