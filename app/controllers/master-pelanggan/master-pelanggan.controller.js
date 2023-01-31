const db = require("../../models");
//const Op = db.Sequelize.Op;
const jsonMessage = require("../../json/jsonMessage");
const masterPelanggan = require("../../repositories/master-pelanggan/master-pelanggan.reposirtory")(db);
const { getPagination, getPagingData } = require("../../utils/pagination");

exports.getPelangganAll = async (req, res) => {
    const { page, size, field, value, type } = req;
    const url = require('url')
    try {
        var condition = null;
        const { limit, offset } = getPagination(page - 1, size);
        if (field !== null && value !== null) {
            const params = field;
            var noTelepon = req.query.noTelepon ? req.query.noTelepon : null
            var querys = url.parse(req.url, true).query;
            const { paramm, fieldd } = querys
        }

        var data = await masterPelanggan.getPelangganAll(condition, limit, offset);

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
            const params = field;
            if (process.env.DIALECT === "oracle") {
                condition = { [field]: { $like: `%${value}%` } };
            } else {
                const Op = db.Sequelize.Op;
                const norek = parseInt(req.query.noRekening)
                condition = { [params]: { [Op.ilike]: `%${value}%` } };
            }
        }
        var data = await masterPelanggan.getMasterBank(condition, limit, offset);

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

exports.insertPelanggan = async (req, res) => {
    const tr = await db.sequelize.transaction();
    try {
        const getmax = await masterPelanggan.getMax();
        var trcData = {
            idPelanggan: parseInt(getmax.total_trid) + 1,
            nama: req.body.nama,
            noTelepon: req.body.no_telepon,
            alamat: req.body.alamat,
            userID: req.body.user_id,
        };
        const tempITransaksi = await masterPelanggan.insertPelanggan(trcData, tr);
        let message = {
            english: `Successfully Insert Master Bank`,
            indonesia: `Berhasil Insert Master Bank`,
        };
        await tr.commit();
        res.send(jsonMessage.jsonSuccess(message, tempITransaksi));
    } catch (err) {

        const errMessage = err.message || "Some error occurred while input Master Bank";
        if (err.original !== undefined) {
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
        await tr.rollback();
    }
};

exports.updatePelanggan = async (req, res) => {
    const tr = await db.sequelize.transaction();
    try {
        var dataTransaksi = {
            idPelanggan: req.body.id_pelanggan,
            nama: req.body.nama,
            noTelepon: req.body.no_telepon,
            alamat: req.body.alamat,
            userID: req.body.user_id,
        };
        const tempUTransaksi = await masterPelanggan.updatePelanggan(req.body.id_pelanggan, dataTransaksi, tr);
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

exports.deletePelanggan = async (req, res) => {
    const tr = await db.sequelize.transaction();
    try {
        const tempIEmp = await masterPelanggan.deletePelanggan(req.body.id_pelanggan, tr);
        let message = {
        english: `Successfully Update EMP`,
        indonesia: `Berhasil Update EMP`,
        };
        await tr.commit();
        res.send(jsonMessage.jsonSuccess(message, tempIEmp));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while input EMP";
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