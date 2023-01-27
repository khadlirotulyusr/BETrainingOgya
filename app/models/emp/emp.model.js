module.exports = (sequelize, Sequelize) => {
  
const empDB = sequelize.define("EMP", {
    EMPNO: {
      //autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    ENAME: {
      type: Sequelize.STRING
    },
    JOB: {
      type: Sequelize.STRING
    },
    KODEMANAGER: {
      field: 'MGR',
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
      type:Sequelize.DECIMAL(10, 2),
    }
  }, {
    //sequelize, // We need to pass the connection instance
    modelName: 'empDB', // We need to choose the model name,
    tableName: 'EMP',
//    freezeTableName: true
  });

  empDB.associate = function(models) {
    empDB.belongsTo(models.managerDB, {foreignKey: 'KODEMANAGER'})

    empDB.belongsTo(models.deptDB, {foreignKey: 'DEPTNO'})
  };

    return empDB;
  };

