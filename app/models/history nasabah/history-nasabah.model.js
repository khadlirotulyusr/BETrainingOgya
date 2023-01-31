module.exports = (sequelize, Sequelize) => {
    const histnbDB = sequelize.define("HISTNASABAH", {
      idHistoryNasabah: {
        field: 'ID_HISTORY_BANK',
        //autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DECIMAL(10, 0),
        autoIncrement: true
      },
      noRekening: {
        field: 'NOREK',
        type: Sequelize.INTEGER
      },
      tanggal: {
        field: 'TANGGAL',
        type: Sequelize.DATE
      },
      nama: {
        field: 'NAMA',
        type: Sequelize.STRING
      },
      uangNasabah: {
        field: 'UANG',
        type: Sequelize.DECIMAL(12, 0),
      },
      statusKet: {
        field: 'STATUS_KET',
        type:Sequelize.INTEGER,
      },
      noRekeningDituju: {
        field: 'NOREK_DITUJU',
        type:Sequelize.INTEGER,
      },    
      /**/
      noTelepon: {
        field: 'NO_TLP',
        type:Sequelize.INTEGER,
      },/**/
      
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: 'histnbDB', // We need to choose the model name,
      tableName: 'HISTORY_BANK',
      //freezeTableName: true
    });
  
    histnbDB.associate = function(models) {
        // trnbDB.belongsTo(models.managerDB, {foreignKey: 'managerId',sourceKey: ''})
  
    //   empDB.belongsTo(models.deptDB, {foreignKey: 'departmentId'})
    //   empDB.belongsTo(models.jobDB, {foreignKey: 'jobId'})
    };
  
      return histnbDB;
    };
  
  