function pelangganRepository(db) {

    const getPelangganAll = (condition, limit, offset) => {
        return db.masterPelangganDB.findAndCountAll({
            attributes: [
                'ID_PELANGGAN',
                'NAMA',
                'NO_TELP',
                'ALAMAT',
                'USER_ID',
            ],
            where: {    
                ...condition
            },
            raw: true,
        });
    }

    const getMax = () => {
        try {
            const max = db.masterPelangganDB.findAll({
                attributes: [
                    //db.sequelize.fn('MAX', db.sequelize.col('EMPLOYEE_ID'))
                    [db.sequelize.fn('MAX', db.sequelize.col("ID_PELANGGAN")), "total_trid"]
                ],
                raw: true,
                nest: true,
                plain: true,

            });
            console.log('maxxx >>>', max);
            return max;

            

        } catch (err) {
            const errMessage = err.message || "Some error occurred while input data transaksi nasabah";
            if (err.original !== undefined) {
                console.log("err.original.code", err.original.code);
                console.log("err.message", err.message);
                res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
            } else {
                res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
            }
        }

    }
    const insertPelanggan = (trcData, tr) => {
        const insertPelanggan= db.masterPelangganDB.create(trcData,
            {
                transaction: tr
            }
        );
        return insertPelanggan
    }

    const updatePelanggan = (idPelanggan, trcData, tr) => {
        const updatePelanggan = db.masterPelangganDB.update(trcData,
            {
                where: {
                    ID_PELANGGAN: idPelanggan,
                },
                transaction: tr
            }
        );
        return updatePelanggan

    }

    const deletePelanggan = (idPelanggan, tr) => {

        const deletePelanggan = db.masterPelangganDB.destroy(
            {
                where: {
                    idPelanggan: idPelanggan,
                },

                transaction: tr
            }
        );
        return deletePelanggan

    }

    return {
        getPelangganAll,
        getMax,
        insertPelanggan,
        updatePelanggan,
        deletePelanggan
    }
}


module.exports = pelangganRepository