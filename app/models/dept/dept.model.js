module.exports = (sequelize, Sequelize) => {
    const deptDB = sequelize.define("DEPT", {
        departmentId: {
        field: 'DEPARTMENT_ID',
          //autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DECIMAL(10, 2)
      },
        departmentName: {
        field: 'DEPARTMENT_NAME',
        type: Sequelize.STRING
      },
        locationID: {
        field: 'LOCATION_ID',  
        type: Sequelize.DECIMAL(10, 2)
      },
      managerID: {
        field: 'MANAGER_ID',
        type: Sequelize.DECIMAL(10, 2)
      }

    }, {
      
      sequelize, // We need to pass the connection instance
      modelName: 'deptDB', // We need to choose the model name,
      tableName: 'DEPARTMENTS',
      freezeTableName: true
    });
    deptDB.associate = function(models) {
        deptDB.hasMany(models.empDB, {foreignKey: 'departmentId', sourceKey: 'departmentId'})
        deptDB.belongsTo(models.managerDB, {foreignKey: 'managerID', sourceKey: 'employeeId'})
    };
    /**/
      //console.log(deptDB)
    return deptDB;
  };

