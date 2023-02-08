function hsttlkmRepository(db) {




        const getHistTlkm = (condition, limit, offset) => {

            return db.histtlkmDB.findAndCountAll({
               // distinct: true,


          attributes:
                [
                'idHistoryTelkom',
                'idPelanggan',
                'tanggal_bayar',
                'bulan_tagihan',
                'tahun_tagihan',
                'uang'  
                ],
           where : {  
            ... condition
           },//
           order :[
            'idHistoryTelkom'
           ],
        //    limit, 
        //    offset,
           raw : true,
                // nest : true,
                // plain: false,
            });
        }

    const insertHistoryTelkom = (hstData, tr) => {
        

        const insertHistoryTelkom= db.histtlkmDB.create(hstData,
            {
                transaction: tr
            }
        );
        return insertHistoryTelkom
    }

    const getMax = () => {

        try {
            const max = db.histtlkmDB.findAll({
                attributes: [
                    //db.sequelize.fn('MAX', db.sequelize.col('EMPLOYEE_ID'))
                    [db.sequelize.fn('MAX', db.sequelize.col("ID_HISTORY")), "total_trid"]
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

        //db.empDB.create
    // const updateTrNasabah = (idTrNasabah, trcData, tr) => {
    //     const updatetransaksi = db.trnbDB.update(trcData,
    //         {
    //             where: {
    //                 idTransansaksiNasabah: idTrNasabah,
    //             },

    //             transaction: tr
    //         }
    //     );
    //     return updatetransaksi

    // }

    // const deleteEmp = (employeeIdPrm, tr) => {

    //     const updateemp = db.empDB.destroy(
    //         {
    //             where: {
    //                 employeeId: employeeIdPrm,
    //             },

    //             transaction: tr
    //         }
    //     );
    //     return deleteEmp
    return {
        getHistTlkm,
        insertHistoryTelkom,
        getMax
    }

}

   


module.exports = hsttlkmRepository