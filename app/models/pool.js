var mysql   = require("mysql");
const dbConfig = require("../config/db.config.js");

var pool = mysql.createPool({
    connectionLimit : 10,
    host: dbConfig.HOST,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.DB
});