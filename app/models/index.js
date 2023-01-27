const env = process.env.NODE_ENV || 'development';

const config = require("../config/db.config.js")[env];
const db = {};
//console.log(config);
var module_sequelize='sequelize';

module_sequelize=process.env.DIALECT==='oracle'?`cu8-sequelize-${process.env.DIALECT}`:`sequelize`;
//console.log(module_sequelize);
const Sequelize = require(module_sequelize);
let sequelize;
//console.log("config.use_env_variable",config.use_env_variable)
//console.log(config.use_env_variable);
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//console.log("db.sequelize",db.sequelize);
db.deptDB = require("./dept/dept.model")(sequelize, Sequelize);
db.empDB = require("./emp/emp.model")(sequelize, Sequelize);
db.managerDB = require("./manager/manager.model")(sequelize, Sequelize);
db.jobDB = require("./job/job.model")(sequelize, Sequelize);

//db.bonusDB = require("./bonus/bonus.model")(sequelize, Sequelize);

Object.keys(db).forEach((model) => {
  if (db[model].associate) {
    db[model].associate(db);
  }
})

//set one to many
// db.tbatch.hasOne(db.regwsidDB, {foreignKey: 'id_batch', sourceKey: 'id_batch'});
//db.tbatch.hasMany(db.qrdataDB, {foreignKey: 'id_batch', sourceKey: 'id_batch'});

// suspect
/*db.regissnDB.hasMany(db.termsnregispict, {foreignKey: 'id_sn_reg', sourceKey: 'id_sn_reg'});
*/
//console.log("db",db)
module.exports = db;