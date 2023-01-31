function hstnbRepository(db) {


    // const getOptionsTrnb = (condition, limit, offset) => {
    //     //console.log("Mysql", db.sequelize.whereQuery);    
    //     return db.trnbDB.findAndCountAll({
    //         attributes: [
    //             'idTransansaksiNasabah',
    //             'noRekening',
    //             'tanggal',
    //             'statusNasabah',
    //             'uangNasabah',
    //             'statusKet',
    //             'noRekeningDituju',
    //             'noTelepon'


    //             //                ['EMPNO','value'],['ENAME','label'],
    //         ],
    //         where: {
    //             //'$DEPT.DEPTNO$' : 30, 

    //             ...condition
    //         },
    //         raw: true,
    //         //            nest : true,
    //         //            plain: true,

    //     });
    // }

        const gethistnbDB = (condition, limit, offset) => {

            return db.histnbDB.findAndCountAll({
               // distinct: true,


          attributes:
                [
                'idHistoryNasabah',
                'noRekening',
                'tanggal',
                'nama',
                'uangNasabah',
                'statusKet',
                'noRekeningDituju',
                'noTelepon'  
                ],
           where : {  
            ... condition
           },//
           order :[
            'idHistoryNasabah'
           ],
           limit, 
           offset,
           raw : true,
                nest : true,
                plain: false,
            });
        }

    const insertHistoryNasabah = (hstData, tr) => {
        

        const insertHistoryNasabah= db.histnbDB.create(hstData,
            {
                transaction: tr
            }
        );
        return insertHistoryNasabah
    }

    const getMax = () => {

        try {
            const max = db.histnbDB.findAll({
                attributes: [
                    //db.sequelize.fn('MAX', db.sequelize.col('EMPLOYEE_ID'))
                    [db.sequelize.fn('MAX', db.sequelize.col("ID_HISTORY_BANK")), "total_trid"]
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
        gethistnbDB,
        insertHistoryNasabah,
        getMax
    }

}

   


module.exports = hstnbRepository