function userRepository(db) {


    const getOptionsUser = (condition, limit, offset) => {
        //console.log("Mysql", db.sequelize.whereQuery);    
        return db.userDB.findAndCountAll({
            attributes: [
                'userId',
                //'DEPT.departmentName'
                //[db.sequelize.col('DEPT.departmentName'),'departmentName']
                'username',
                'password',
                'nama',
                'alamat',
                'email',
                'noTelepon',
                'programName',
                'createdDate',
                'createdBy',
                'updatedDate',
                'updatedBy'


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

        

    return {
        getOptionsUser,
        
        // insertEmp,
        // getEmp,
        // getMax,
        // updateEmp,
        // deleteEmp
    }
}


module.exports = userRepository