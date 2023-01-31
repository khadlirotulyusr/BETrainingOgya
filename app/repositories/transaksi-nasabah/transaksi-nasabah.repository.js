function trnbRepository(db) {


    const getOptionsTrnb = (condition, limit, offset) => {
        //console.log("Mysql", db.sequelize.whereQuery);    
        return db.trnbDB.findAndCountAll({
            attributes: [
                'idTransaksiNasabah',
                //'DEPT.departmentName'
                //[db.sequelize.col('DEPT.departmentName'),'departmentName']
                'noRekening',
                'tanggal',
                'statusNasabah',
                'uangNasabah',
                'statusKet',
                'noRekeningDituju',
                'noTelepon'


                //                ['EMPNO','value'],['ENAME','label'],
            ],
            where: {
                //'$DEPT.DEPTNO$' : 30, 

                ...condition
            },
            raw: true,
            //            nest : true,
            //            plain: true,

        });
    }

        const getTrnb = (condition, limit, offset) => {

            return db.trnbDB.findAndCountAll({
               // distinct: true,


          attributes:
                [
                    'idTransaksiNasabah',
                //'DEPT.departmentName'
                //[db.sequelize.col('DEPT.departmentName'),'departmentName']
                'noRekening',
                'tanggal',
                'statusNasabah',
                'uangNasabah',
                'statusKet',
                'noRekeningDituju',
                'noTelepon'  


                ],

           /**/

    /* */    
    //       include: [
    //         {
    //             //through:{
    //             attributes:['firstName','lastName'//'KODEATASAN',//'MANAGERNAME'
    //             ],//},//},
    //             model: db.managerDB,
    //            as:'Manager', 
    //            required:false,

    //            //where : {EMPNO : 20 },

    //         },
    //        {
    //             attributes:['departmentId','departmentName'//'KODEATASAN',//'MANAGERNAME'

    //             ],//},//},
    //             model: db.deptDB,
    //            as:'DEPT', 
    //            required:true,
    //            where : {
    //             //'$deptDB.DEPARTMENT_NAME$' : 100,    
    //             //... condition
    //            }
    //            //where : {EMPNO : 20 },

    //         },
    //         {
    //  //            attributes:['jobID','jobName'//'KODEATASAN',//'MANAGERNAME'

    // //             ],//},//},
    //              model: db.jobDB,
    //             as:'JOB', 
    //             required:true,

    //             //where : {EMPNO : 20 },

    //          }],

                //group: ["EMP.EMPLOYEE_ID"],

             /**/
           where : {
            //'$deptDB.DEPARTMENT_NAME$' : 100,    
            ... condition
           },//
           order :[
            'idTransaksiNasabah'
           ],
           limit, 
           offset,
           raw : true,
                nest : true,
                plain: false,
                //mapToModel: false,
                //distinct :true

            });
        }

    const getMax = () => {

        try {
            const max = db.trnbDB.findAll({
                attributes: [
                    //db.sequelize.fn('MAX', db.sequelize.col('EMPLOYEE_ID'))
                    [db.sequelize.fn('MAX', db.sequelize.col("ID_TRANSAKSI_NASABAH")), "total_trid"]
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
    const insertTransaksiNasabah = (trcData, tr) => {
        

        const inserttransaksi= db.trnbDB.create(trcData,
            {
                transaction: tr
            }
        );
        return inserttransaksi
    }

        //db.empDB.create
    const updateTrNasabah = (idTrNasabah, trcData, tr) => {
        const updatetransaksi = db.trnbDB.update(trcData,
            {
                where: {
                    idTransaksiNasabah: idTrNasabah,
                },

                transaction: tr
            }
        );
        return updatetransaksi

    }

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

    // }

    return {
        getOptionsTrnb,
        getTrnb,
        getMax,
        insertTransaksiNasabah,
        updateTrNasabah
        
        // insertEmp,
        // getEmp,
        // getMax,
        // updateEmp,
        // deleteEmp
    }
}


module.exports = trnbRepository