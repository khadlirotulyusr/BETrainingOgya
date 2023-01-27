function jobRepository(db) {

const getAllJobForOption = (condition, limit, offset) => {
    //console.log("Mysql", db.sequelize.whereQuery);    
    return db.jobDB.findAndCountAll({
            attributes:['jobId','jobTitle','minSalary','msxSalary'
            ]
            ,
            /**/where : {
                //'$DEPT.DEPTNO$' : 30, 
                ... condition
            },//

            //limit, 
            //offset,
            raw : true,
    //            nest : true,
    //            plain: true,

      });
    }    
    return {
        getAllJobForOption
    }
}
module.exports = jobRepository