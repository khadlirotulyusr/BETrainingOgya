module.exports = (sequelize, Sequelize) => {
  
const managerDB = sequelize.define("MANAGER", {
      KODEMANAGER: {
      //autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    MANAGERNAME: {
      type: Sequelize.STRING
    },
    JOB: {
      type: Sequelize.STRING
    },
    KODEATASAN: {
      field: 'KODEATASAN',
      type:Sequelize.INTEGER,
    },
    /**/
    HIREDATE: {
      field: 'HIREDATE',
      type:Sequelize.DATE,
    },/**/
    SALARY: {
      field: 'SAL',
      type:Sequelize.DOUBLE,
    },
    COMMITION: {
      field: 'COMM',
      type:Sequelize.DOUBLE,
    },
    DEPTNO:{
      type:Sequelize.BIGINT,
    }
  }, {
    //sequelize, // We need to pass the connection instance
   // modelName: 'managerDB', // We need to choose the model name,
    tableName: 'MANAGER',
    freezeTableName: true
  });
//console.log("SASAs111");
  managerDB.associate = function(models) {
  //  console.log("SASAs11122222");
    managerDB.belongsTo(models.deptDB, {foreignKey: 'DEPTNO'})
    managerDB.hasMany(models.empDB, {foreignKey: 'KODEMANAGER'})
  };

    return managerDB;
  };

