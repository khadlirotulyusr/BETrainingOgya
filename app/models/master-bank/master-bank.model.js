module.exports = (sequelize, Sequelize) => {
    const masterBankDB = sequelize.define("MB", {
        noRekening: {
            field: 'NOREK',
            //autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nama: {
            field: 'NAMA',
            type: Sequelize.STRING
        },
        alamat: {
            field: 'ALAMAT',
            type: Sequelize.STRING
        },
        noTelepon: {
            field: 'NOTLP',
            type: Sequelize.INTEGER,
        },
        saldo: {
            field: 'SALDO',
            type: Sequelize.DECIMAL(12, 0),
        },
        userID: {
            field: 'USER_ID',
            type: Sequelize.INTEGER,
        },
    },
        {
            sequelize, // We need to pass the connection instance
            modelName: 'masterBankDB', // We need to choose the model name,
            tableName: 'MASTER_BANK',
            //freezeTableName: true
        });

    masterBankDB.associate = function (models) {
        // trnbDB.belongsTo(models.managerDB, {foreignKey: 'managerId',sourceKey: ''})

        //   empDB.belongsTo(models.deptDB, {foreignKey: 'departmentId'})
        //   empDB.belongsTo(models.jobDB, {foreignKey: 'jobId'})
    };

    return masterBankDB;
};

