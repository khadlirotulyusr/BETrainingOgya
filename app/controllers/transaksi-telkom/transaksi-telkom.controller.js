const db = require("../../models");
//const Op = db.Sequelize.Op;
const jsonMessage = require("../../json/jsonMessage");
const trtkRepo = require("../../repositories/transaksi-telkom/transaksi-telkom.repository")(db);
const { getPagination, getPagingData } = require("../../utils/pagination");


exports.getOptionsTrtk = async (req, res) => {
    const { page, size, field, value, type } = req;
    const url = require('url')
    try {
        var condition = null;
        const { limit, offset } = getPagination(page - 1, size);

        if (field && value ) {
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


            //     const Op = db.Sequelize.Op;
            // condition = { [params]: { [Op.ilike]: `%${value}%` } };
            console.log(req.query);
            console.log(req.query.data);
            console.log(req.params);
            // console.log(value);
        }

        var data = await trtkRepo.getOptionsTrtk(condition, limit, offset);

        const response = getPagingData(data, page, limit);
        let message = {
            english: `Successfully Retrieved Data Transaksi Telkom`,
            //"indonesia" : `Berhasil Mengambil Data EMP`,
        };
        res.send(jsonMessage.jsonSuccess(message, response));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while get Data Transaksi Telkom";
        if (err.original !== undefined) {
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
    }
};

exports.getTrtk = async (req, res) => {
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
        var data = await trtkRepo.getTrtk(condition, limit, offset);
        console.log("field >>>", field);

        /*    
          for (intLoop=0;intLoop<=data.rows.length-1;intLoop++)
          {
            var subData = await empRepo.getManagerRecursive(
              data.rows[intLoop])
    
            data.rows[intLoop]=subData;
            ///console.log("subData",subData,intLoop)
    //        console.log(intLoop,data.rows[intLoop])
    
          }/**/
        //console.log("data",data)
        const response = getPagingData(data, page, limit);
        let message = {
            english: `Successfully Retrieved Data Transaksi Nasabah`,
            //"indonesia" : `Berhasil Mengambil Data EMP`,
        };
        res.send(jsonMessage.jsonSuccess(message, response));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while get Data EMP";
        if (err.original !== undefined) {
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
    }
};


exports.insertTransaksiTelkom = async (req, res) => {
    const tr = await db.sequelize.transaction();
    let tanggalParam = Date.parse(req.body.tanggal);
    // console.log('get maxxx>>');
    try {
        const getmax = await trtkRepo.getMax();
        console.log('get maxxx>>', getmax);
        var trcData = {

            idTransaksiTelkom: parseInt(getmax.total_trid) + 1,
            idPelanggan: req.body.idPelanggan,
            bulanTagihan: req.body.bulanTagihan,
            tahunTagihan: req.body.tahunTagihan,
            uangTelkom: req.body.uangTelkom,
            statusTelkom: req.body.statusTelkom
        };

        const tempITransaksi = await trtkRepo.insertTransaksiTelkom(trcData, tr);
        //console.log("tempIEmp",tempIEmp)
        let message = {
            english: `Successfully Insert Transaksi Telkom`,
            indonesia: `Berhasil Insert Transaksi Telkom`,
        };
        await tr.commit();
        res.send(jsonMessage.jsonSuccess(message, tempITransaksi));
    } catch (err) {

        const errMessage = err.message || "Some error occurred while input transaksi telkom";
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

exports.updateTrNasabah = async (req, res) => {
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
        const tempUTransaksi = await trnbRepo.updateTrNasabah(req.body.idTransansaksiNasabah, dataTransaksi, tr);
        let message = {
            english: `Successfully Update Transaksi Nasabah`,
            indonesia: `Berhasil Update Transaksi Nasabah`,
        };
        await tr.commit();
        res.send(jsonMessage.jsonSuccess(message, tempUTransaksi));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while update Transaksi Nasabah";
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