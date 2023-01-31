module.exports = (sequelize, Sequelize) => {
    const masterPelanggan = sequelize.define("MASTER_PELANGGAN", {
        idPelanggan: {
            field: 'ID_PELANGGAN',
            autoIncrement: true,
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
            field: 'NO_TELP',
            type: Sequelize.INTEGER,
        },
        userID: {
            field: 'USER_ID',
            type: Sequelize.INTEGER,
        },
    },
        {
            sequelize, // We need to pass the connection instance
            modelName: 'masterPelanggan', // We need to choose the model name,
            tableName: 'MASTER_PELANGGAN',
            //freezeTableName: true
        });

    return masterPelanggan;
};