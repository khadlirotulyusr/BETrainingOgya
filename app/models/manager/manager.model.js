module.exports = (sequelize, Sequelize) => {
  
const managerDB = sequelize.define("Manager", {
  employeeId: {
    field: 'EMPLOYEE_ID',
    primaryKey: true,
    type: Sequelize.DECIMAL(6, 0)
  },
  firstName: {
    field: 'FIRST_NAME',
    type: Sequelize.STRING
  },
  lastName: {
    field: 'LAST_NAME',
    type: Sequelize.STRING
  },
  email: {
    field: 'EMAIL',
    type: Sequelize.STRING
  },
  departmentId: {
    field: 'DEPARTMENT_ID',
    type: Sequelize.DECIMAL(4, 0),
  },
  managerID: {
    field: 'MANAGER_ID',
    type:Sequelize.DECIMAL(6, 0),
  },
  phoneNumber: {
    field: 'PHONE_NUMBER',
    type:Sequelize.INTEGER,
  },    
  /**/
  hireDate: {
    field: 'HIRE_DATE',
    type:Sequelize.DATE,
  },/**/
  salary: {
    field: 'SALARY',
    type:Sequelize.DOUBLE,
  },
  commissionPct: {
    field: 'COMMISSION_PCT',
    type:Sequelize.DOUBLE,
  },
  JobID:{
    field: 'JOB_ID',
    type:Sequelize.STRING,
  
  },
  }, {
    //sequelize, // We need to pass the connection instance
   // modelName: 'managerDB', // We need to choose the model name,
   modelName: 'managerDB', // We need to choose the model name,
    tableName: 'EMPLOYEES',
  });
  managerDB.associate = function(models) {
  //  console.log("SASAs11122222");
    managerDB.belongsTo(models.deptDB, {foreignKey: 'departmentId', sourceKey: 'departmentId'})
    managerDB.hasMany(models.empDB, {foreignKey: 'managerID', sourceKey: 'employeeId'})
    managerDB.hasMany(models.deptDB, {foreignKey: 'managerID', sourceKey: 'employeeId'})
  };

    return managerDB;
  };

