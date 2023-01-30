module.exports = (sequelize, Sequelize) => {
    const trnbDB = sequelize.define("TRNASABAH", {
      idTransansaksiNasabah: {
        field: 'ID_TRANSAKSI_NASABAH',
        //autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DECIMAL(6, 0)
      },
      noRekening: {
        field: 'NOREK',
        type: Sequelize.INTEGER
      },
      tanggal: {
        field: 'TANGGAL',
        type: Sequelize.DATE
      },
      statusNasabah: {
        field: 'STATUS',
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
      modelName: 'trnbDB', // We need to choose the model name,
      tableName: 'TRANSAKSI_NASABAH',
      //freezeTableName: true
    });
  
    trnbDB.associate = function(models) {
        // trnbDB.belongsTo(models.managerDB, {foreignKey: 'managerId',sourceKey: ''})
  
    //   empDB.belongsTo(models.deptDB, {foreignKey: 'departmentId'})
    //   empDB.belongsTo(models.jobDB, {foreignKey: 'jobId'})
    };
  
      return trnbDB;
    };
  
  