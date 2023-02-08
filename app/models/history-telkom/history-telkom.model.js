module.exports = (sequelize, Sequelize) => {
    const histtlkmDB = sequelize.define("HISTTELKOM", {
      idHistoryTelkom: {
        field: 'ID_HISTORY',
        //autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DECIMAL(10, 0),
        autoIncrement: true
      },
      idPelanggan: {
        field: 'ID_PELANGGAN',
        type: Sequelize.DECIMAL(10,0)
      },
      tanggal_bayar: {
        field: 'TANGGAL_BAYAR',
        type: Sequelize.DATE
      },
      bulan_tagihan: {
        field: 'BULAN_TAGIHAN',
        type: Sequelize.DECIMAL(10,0)
      },
      tahun_tagihan: {
        field: 'TAHUN_TAGIHAN',
        type: Sequelize.DECIMAL(10,0),
      },
      uang: {
        field: 'UANG',
        type:Sequelize.DECIMAL(12,0),
      }    
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: 'histtlkmDB', // We need to choose the model name,
      tableName: 'HISTORY_TELKOM',
      //freezeTableName: true
    });
  
    histtlkmDB.associate = function(models) {
        // trnbDB.belongsTo(models.managerDB, {foreignKey: 'managerId',sourceKey: ''})
  
    //   empDB.belongsTo(models.deptDB, {foreignKey: 'departmentId'})
    //   empDB.belongsTo(models.jobDB, {foreignKey: 'jobId'})
    };
  
      return histtlkmDB;
    };
  
  