function masterBankRepository(db) {

    const getOptionsMasterBank = (condition, limit, offset) => {
        return db.masterBankDB.findAndCountAll({
            attributes: [
                'noRekening',
                'nama',
                'alamat',
                'noTelepon',
                'saldo',
                'userID',
            ],

            where: {
                ...condition
            },

            raw: true,
            nest: true,
            plain: true,
        });
    }

    const getMasterBank = (condition, limit, offset) => {
        return db.masterBankDB.findAndCountAll({
            attributes:
                [
                    'noRekening',
                    'nama',
                    'alamat',
                    'noTelepon',
                    'saldo',
                    'userID',
                ],

            where: {
                ...condition
            },

            order: [
                'noRekening'
            ],

            limit,
            offset,
            raw: true,
            nest: true,
            plain: false,

        });
    }

    const getMax = () => {
        try {
            const max = db.masterBankDB.findAll({
                attributes: [
                    [db.sequelize.fn('MAX', db.sequelize.col("NOREK")), "total_trid"]
                ],

                raw: true,
                nest: true,
                plain: true,

            });
            console.log('maxxx >>>', max);
            return max;

        } catch (err) {
            const errMessage = err.message || "Some error occurred while input data Master Bank";
            if (err.original !== undefined) {
                console.log("err.original.code", err.original.code);
                console.log("err.message", err.message);
                res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
            } else {
                res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
            }
        }
    }

    const insertMasterBank = (master_bankData, tr) => {
        const insertMaster_Bank = db.masterBankDB.create(master_bankData,
            {
                transaction: tr
            }
        );
        return insertMaster_Bank
    }

    const updateMasterBank = (no_rekening, master_bankData, tr) => {
        const updateMaster_Bank = db.masterBankDB.update(master_bankData,
            {
                where: {
                    noRekening: no_rekening,
                },

                transaction: tr
            }
        );
        return updateMaster_Bank

    }

    const deleteMasterBank = (no_rekening, tr) => {
        const deleteMaster_Bank = db.masterBankDB.destroy(
            {
                where: {
                    noRekening: no_rekening,
                },

                transaction: tr
            }
        );
        return deleteMaster_Bank
    }

    return {
        getOptionsMasterBank,
        getMasterBank,
        getMax,
        insertMasterBank,
        updateMasterBank,
        deleteMasterBank
    }
}


module.exports = masterBankRepository