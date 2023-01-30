module.exports = (sequelize, Sequelize) => {
    const trtkDB = sequelize.define("TRTELKOM", {
      idTransaksiTelkom: {
        field: 'ID_TRANSAKSI',
        //autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DECIMAL(6, 0)
      },
      idPelanggan: {
        field: 'ID_PELANGGAN',
        type: Sequelize.DECIMAL(6, 0)
      },
      bulanTagihan: {
        field: 'BULAN_TAGIHAN',
        type: Sequelize.INTEGER
      },
      tahunTagihan: {
        field: 'TAHUN_TAGIHAN',
        type: Sequelize.INTEGER
      },
      uangTelkom: {
        field: 'UANG',
        type: Sequelize.DECIMAL(12, 0),
      },
      statusTelkom: {
        field: 'STATUS',
        type:Sequelize.INTEGER,
      },
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: 'trtkDB', // We need to choose the model name,
      tableName: 'TRANSAKSI_TELKOM',
      //freezeTableName: true
    });
  
    trtkDB.associate = function(models) {
    //   empDB.belongsTo(models.managerDB, {foreignKey: 'managerId',sourceKey: ''})
  
    //   empDB.belongsTo(models.deptDB, {foreignKey: 'departmentId'})
    //   empDB.belongsTo(models.jobDB, {foreignKey: 'jobId'})
    };
  
      return trtkDB;
    };
  
  