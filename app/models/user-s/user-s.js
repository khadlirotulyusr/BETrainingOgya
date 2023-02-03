module.exports = (sequelize, Sequelize) => {
    const userDB = sequelize.define("USER", {
      userId: {
        field: 'USER_ID',
        //autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DECIMAL(11, 0)
      },
      username: {
        field: 'USERNAME',
        type: Sequelize.STRING
      },
      password: {
        field: 'PASSWORD',
        type: Sequelize.STRING
      },
      nama: {
        field: 'NAMA',
        type: Sequelize.STRING
      },
      alamat: {
        field: 'ALAMAT',
        type: Sequelize.STRING,
      },
      email: {
        field: 'EMAIL',
        type:Sequelize.STRING,
      },
      noTelepon: {
        field: 'TELP',
        type:Sequelize.STRING,
      },    
      
      programName: {
        field: 'PROGRAM_NAME',
        type:Sequelize.STRING,
      },
      createdDate : {
        field: 'CREATED_DATE',
        type: Sequelize.DATE
      },
      createdBy : {
        field: 'CREATED_BY',
        type: Sequelize.STRING
      },
      updatedDate : {
        field:'UPDATED_DATE',
        type: Sequelize.DATE
      },
      updatedBy : {
        field:'UPDATED_BY',
        type: Sequelize.STRING
      }
      
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: 'userDB', // We need to choose the model name,
      tableName: 'USERS',
      //freezeTableName: true
    });
  
    userDB.associate = function(models) {
        // trnbDB.belongsTo(models.managerDB, {foreignKey: 'managerId',sourceKey: ''})
  
    //   empDB.belongsTo(models.deptDB, {foreignKey: 'departmentId'})
    //   empDB.belongsTo(models.jobDB, {foreignKey: 'jobId'})
    };
  
      return userDB;
    };
  
  