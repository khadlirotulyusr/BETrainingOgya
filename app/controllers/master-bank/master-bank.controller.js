const db = require("../../models");
//const Op = db.Sequelize.Op;
const jsonMessage = require("../../json/jsonMessage");
const masterBankRepo = require("../../repositories/master-bank/master-bank.repository")(db);
const { getPagination, getPagingData } = require("../../utils/pagination");

exports.getOptionsMasterBank = async (req, res) => {
    const { page, size, field, value, type } = req;
    const url = require('url')
    try {
        var condition = null;
        const { limit, offset } = getPagination(page - 1, size);

        if (field !== null && value !== null) {
            const params = field;
            var noTelepon = req.query.noTelepon ? req.query.noTelepon : null
            var noRekening = req.query.noRekening

            var querys = url.parse(req.url, true).query;
            const { paramm, fieldd } = querys
            console.log(querys, '>>>')
            console.log(paramm, 'paramm')
            console.log(fieldd, 'filedd')
            console.log(req.query)
            console.log(req.query.data);
            console.log(req.params)
            console.log(value);
        }

        var data = await masterBankRepo.getOptionsMasterBank(condition, limit, offset);

        const response = getPagingData(data, page, limit);
        let message = {
            english: `Successfully Retrieved Data Master Bank`,
            //"indonesia" : `Berhasil Mengambil Data MASTER BANK`,
        };
        res.send(jsonMessage.jsonSuccess(message, response));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while get Data Master Bank";
        if (err.original !== undefined) {
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
    }
};

exports.getMasterBank = async (req, res) => {
    const { page, size, field, value } = req.query;
    try {
        var condition = null;
        const { limit, offset } = getPagination(page - 1, size);

        if (field !== null && value !== null) {
            // console.log("field >>>", field);
            const params = field;
            console.log("value >>", value)

            if (process.env.DIALECT === "oracle") {
                condition = { [field]: { $like: `%${value}%` } };
            } else {
                console.log('postgre')
                const Op = db.Sequelize.Op;
                console.log('Op >>', Op);
                const norek = parseInt(req.query.noRekening)
                condition = req.query
                // condition = { [params]: { [Op.ilike]: `%${value}%` } };
                // condition = { noRekening: { [Op.like]: `%${norek}%` } };
                // console.log('condition >>>',condition);
                // console.log(typeof(norek));
            }
        }
        var data = await masterBankRepo.getMasterBank(condition, limit, offset);
        console.log("field >>>", field);

        const response = getPagingData(data, page, limit);
        let message = {
            english: `Successfully Retrieved Data Master Bank`,
            indonesia: `Berhasil Mengambil Data MASTER BANK`,
        };
        res.send(jsonMessage.jsonSuccess(message, response));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while get Data MASTER BANK";
        if (err.original !== undefined) {
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
    }
};

exports.insertMasterBank = async (req, res) => {
    const row = await db.sequelize.transaction();
    try {
        var masterBankData = {
            noRekening: req.body.noRekening,
            nama: req.body.nama,
            alamat: req.body.alamat,
            noTelepon: req.body.noTelepon,
            saldo: req.body.saldo,
            userID: req.body.userID,
        };

        const tempMasterBank = await masterBankRepo.insertMasterBank(masterBankData, row);
        let message = {
            english: `Successfully Insert Master Bank`,
            indonesia: `Berhasil Insert Master Bank`,
        };
        await row.commit();
        res.send(jsonMessage.jsonSuccess(message, tempMasterBank));
    } catch (err) {

        const errMessage = err.message || "Some error occurred while input Master Bank";
        if (err.original !== undefined) {
            console.log("err.original.code", err.original.code);
            console.log("err.message", err.message);
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
        await row.rollback();
    }
};

exports.updateMasterBank = async (req, res) => {
    const row = await db.sequelize.transaction();
    try {
        var masterBankData = {
            noRekening: req.body.noRekening,
            nama: req.body.nama,
            alamat: req.body.alamat,
            noTelepon: req.body.noTelepon,
            saldo: req.body.saldo,
            userID: req.body.userID,
        };

        const tempMasterBank = await masterBankRepo.updateMasterBank(req.body.noRekening, masterBankData, row);
        let message = {
            english: `Successfully Update Master Bank`,
            indonesia: `Berhasil Update Master Bank`,
        };
        await row.commit();
        res.send(jsonMessage.jsonSuccess(message, tempMasterBank));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while update Master Bank";
        if (err.original !== undefined) {
            console.log("err.original.code", err.original.code);
            console.log("err.message", err.message);
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
        await row.rollback();
    }
};