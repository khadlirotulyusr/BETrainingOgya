module.exports = (sequelize, Sequelize) => {
    const jobDB = sequelize.define("JOB", {
      jobId: {
        primaryKey: true,
        field: 'JOB_ID',
        type: Sequelize.STRING
      },
      jobTitle: {
        field: 'JOB_TITLE',
        type: Sequelize.STRING
      },
      minSalary: {
        field: 'MIN_SALARY',
        type:Sequelize.DOUBLE,
      },
      msxSalary: {
        field: 'MAX_SALARY',
        type:Sequelize.DOUBLE,
      },
    }, {
      sequelize, // We need to pass the connection instance
      modelName: 'jobDB', // We need to choose the model name,
      tableName: 'JOBS'
    });
    jobDB.associate = function(models) {
      jobDB.hasMany(models.empDB, {foreignKey: 'jobId', sourceKey: 'jobId'})
      //deptDB.belongsTo(models.managerDB, {foreignKey: 'managerID', sourceKey: 'EMPLOYEE_ID'})
  };

//  console.log(bonusDB)
    return jobDB;
  };

