const db = require("../../models");
const jsonMessage = require("../../json/jsonMessage");
const hstTlkmRepo = require("../../repositories/history_telkom/history-telkomrepository")(db);
const { getPagination, getPagingData } = require("../../utils/pagination");

exports.getHstTlkm = async (req, res) => {
    const { page, size, field, value } = req.query;
    try {
        var condition = null;
        const { limit, offset } = getPagination(page - 1, size);

        if (field !== null && value !== null) {
            // console.log("field >>>", field);
            const params = field;
            //       var strArray = params.split(".");
            ///var params1=""; var params2=""
            //params1=strArray[0];params2=strArray[1];
            console.log("value >>", value);
            if (process.env.DIALECT === "oracle") {
              

                condition = { [field]: { $like: `%${value}%` } };

            } else {
                console.log('postgre')
                const Op = db.Sequelize.Op;
                console.log('Op >>', Op);
                // const norek = req.query.noRekening
                condition = req.query
                // condition = { noRekening: { $like: norek } };
                // condition = { noRekening: { [Op.like]: `%${norek}%` } };
                console.log('condition >>>',condition);
                console.log(req.query);
                // console.log(typeof(norek));
            }
        }
        var data = await hstTlkmRepo.getHistTlkm(condition, limit, offset);
        console.log("field >>>", field);

        const response = getPagingData(data, page, limit);
        let message = {
            english: `Successfully Retrieved Data History Transaksi TELKOM`,
            //"indonesia" : `Berhasil Mengambil Data EMP`,
        };
        res.send(jsonMessage.jsonSuccess(message, response));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while get History Transaksi TELKOM";
        if (err.original !== undefined) {
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
    }
};


// exports.insertHistoryNasabah = async (req, res) => {
//     const tr = await db.sequelize.transaction();
//     let tanggalParam = Date.parse(req.body.tanggal);
//     console.log('get maxxx>>');
//     //console.log("hireDate",hireDateParm)
//     try {
//         var hstData = {

//             noRekening: req.body.noRekening,
//             tanggal: req.body.tanggal,
//             nama: req.body.nama,
//             uangNasabah: req.body.uangNasabah,
//             statusKet: req.body.statusKet,
//             noRekeningDituju: req.body.noRekeningDituju,
//             noTelepon: req.body.noTelepon
//         };

//         const tempITransaksi = await hstnbRepo.insertHistoryNasabah(hstData, tr);
//         //console.log("tempIEmp",tempIEmp)
//         let message = {
//             english: `Successfully Insert History Transaksi Nasabah`,
//             indonesia: `Berhasil Insert History Transaksi Nasabah`,
//         };
//         await tr.commit();
//         res.send(jsonMessage.jsonSuccess(message, tempITransaksi));
//     } catch (err) {

//         const errMessage = err.message || "Some error occurred while input History transaksi nasabah";
//         if (err.original !== undefined) {
//             console.log("err.original.code", err.original.code);
//             console.log("err.message", err.message);
//             res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
//         } else {
//             res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
//         }
//         await tr.rollback();
//     }
// };

// exports.updateTrNasabah = async (req, res) => {
//     const tr = await db.sequelize.transaction();
//     try {
//         var dataTransaksi = {
//             noRekening: req.body.noRekening,
//             tanggal: req.body.tanggal,
//             statusNasabah: req.body.statusNasabah,
//             uangNasabah: req.body.uangNasabah,
//             statusKet: req.body.statusKet,
//             noRekeningDituju: req.body.noRekeningDituju,
//             noTelepon: req.body.noTelepon
//         };
//         const tempUTransaksi = await trnbRepo.updateTrNasabah(req.body.idTransansaksiNasabah, dataTransaksi, tr);
//         let message = {
//             english: `Successfully Update Transaksi Nasabah`,
//             indonesia: `Berhasil Update Transaksi Nasabah`,
//         };
//         await tr.commit();
//         res.send(jsonMessage.jsonSuccess(message, tempUTransaksi));
//     } catch (err) {
//         const errMessage = err.message || "Some error occurred while update Transaksi Nasabah";
//         if (err.original !== undefined) {
//             console.log("err.original.code", err.original.code);
//             console.log("err.message", err.message);
//             res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
//         } else {
//             res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
//         }
//         await tr.rollback();
//     }
// };