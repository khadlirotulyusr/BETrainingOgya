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
            console.log(paramm, 'paramm');
            console.log(fieldd, 'filedd')
            // condition = req.query
            // const arrCondition = []
            // arrCondition.push(req.query)

            // condition = { noTelepon : {$like: `%${noTelepon}%`}};


            // condition = 
            // condition = { [params]: { $like: `%${value}%` } };


            //  const Op = db.Sequelize.Op;
            // condition = { [params]: { [Op.ilike]: `%${value}%` } };
            console.log(req.query);
            console.log(req.query.data);
            console.log(req.params);
            // console.log(value);
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

        if (field && value) {
            // console.log("field >>>", field);
            const params = field;
            //       var strArray = params.split(".");
            ///var params1=""; var params2=""
            //params1=strArray[0];params2=strArray[1];
            console.log("value >>", value);
            if (process.env.DIALECT === "oracle") {
                //console.log('params1',params1);

                //console.log('params2',params2);

                condition = { [field]: { $like: `%${value}%` } };

                //console.log('condition',condition)
            } else {
                console.log('postgre')
                const Op = db.Sequelize.Op;
                console.log('Op >>', Op);
                const norek = parseInt(req.query.noRekening)
                //   condition = req.query
                condition = { [params]: { [Op.ilike]: `%${value}%` } };
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
            //"indonesia" : `Berhasil Mengambil Data MASTER BANK`,
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
    const tr = await db.sequelize.transaction();
    let tanggalParam = Date.parse(req.body.tanggal);
    console.log('get maxxx>>');
    try {
        const getmax = await masterBankRepo.getMax();
        console.log('get maxxx>>', getmax);
        var trcData = {

            idTransansaksiNasabah: parseInt(getmax.total_trid) + 1,
            noRekening: req.body.noRekening,
            tanggal: req.body.tanggal,
            statusNasabah: req.body.statusNasabah,
            uangNasabah: req.body.uangNasabah,
            statusKet: req.body.statusKet,
            noRekeningDituju: req.body.noRekeningDituju,
            noTelepon: req.body.noTelepon
        };

        const tempITransaksi = await masterBankRepo.insertMasterBank(trcData, tr);
        //console.log("tempIEmp",tempIEmp)
        let message = {
            english: `Successfully Insert Master Bank`,
            indonesia: `Berhasil Insert Master Bank`,
        };
        await tr.commit();
        res.send(jsonMessage.jsonSuccess(message, tempITransaksi));
    } catch (err) {

        const errMessage = err.message || "Some error occurred while input Master Bank";
        if (err.original !== undefined) {
            console.log("err.original.code", err.original.code);
            console.log("err.message", err.message);
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
        await tr.rollback();
    }
};

exports.updateMasterBank = async (req, res) => {
    const tr = await db.sequelize.transaction();
    try {
        var dataTransaksi = {
            noRekening: req.body.noRekening,
            tanggal: req.body.tanggal,
            statusNasabah: req.body.statusNasabah,
            uangNasabah: req.body.uangNasabah,
            statusKet: req.body.statusKet,
            noRekeningDituju: req.body.noRekeningDituju,
            noTelepon: req.body.noTelepon
        };
        const tempUTransaksi = await masterBankRepo.updateMasterBank(req.body.idTransansaksiNasabah, dataTransaksi, tr);
        let message = {
            english: `Successfully Update Master Bank`,
            indonesia: `Berhasil Update Master Bank`,
        };
        await tr.commit();
        res.send(jsonMessage.jsonSuccess(message, tempUTransaksi));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while update Master Bank";
        if (err.original !== undefined) {
            console.log("err.original.code", err.original.code);
            console.log("err.message", err.message);
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
        await tr.rollback();
    }
};