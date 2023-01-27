module.exports = (sequelize, Sequelize) => {
    const deptDB = sequelize.define("DEPT", {
      DEPTNO: {
        //autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      DNAME: {
        type: Sequelize.STRING
      },
      LOC: {
        type: Sequelize.STRING
      }
    }, {
      
      sequelize, // We need to pass the connection instance
      modelName: 'deptDB', // We need to choose the model name,
      tableName: 'DEPT',
      freezeTableName: true
    });
    deptDB.associate = function(models) {
        deptDB.hasMany(models.empDB, {foreignKey: 'DEPTNO', sourceKey: 'DEPTNO'})
    };
    /**/
//  console.log(bonusDB)
    return deptDB;
  };

