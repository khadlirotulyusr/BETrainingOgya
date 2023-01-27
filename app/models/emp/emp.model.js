module.exports = (sequelize, Sequelize) => {
  const empDB = sequelize.define("EMP", {
    employeeId: {
      field: 'EMPLOYEE_ID',
      //autoIncrement: true,
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
    managerId: {
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
    jobId:{
      field: 'JOB_ID',
      type:Sequelize.STRING,
    
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: 'empDB', // We need to choose the model name,
    tableName: 'EMPLOYEES',
    //freezeTableName: true
  });

  empDB.associate = function(models) {
    empDB.belongsTo(models.managerDB, {foreignKey: 'managerId',sourceKey: ''})

    empDB.belongsTo(models.deptDB, {foreignKey: 'departmentId'})
    empDB.belongsTo(models.jobDB, {foreignKey: 'jobId'})
  };

    return empDB;
  };

