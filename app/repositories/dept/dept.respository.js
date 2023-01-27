function deptRepository(db) {

const getAllDeptForOption = (condition, limit, offset) => {
    //console.log("Mysql", db.sequelize.whereQuery);    
    return db.deptDB.findAndCountAll({
            attributes:['departmentId','departmentName','locationID','managerID'
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
        getAllDeptForOption 
    }
}
module.exports = deptRepository