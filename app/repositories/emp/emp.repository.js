function empRepository(db) {


    const getOptionsEmp = (condition, limit, offset) => {
        //console.log("Mysql", db.sequelize.whereQuery);    
        return db.empDB.findAndCountAll({
            attributes:[
                'employeeId',
                //'DEPT.departmentName'
                //[db.sequelize.col('DEPT.departmentName'),'departmentName']
                'firstName',
                'lastName',

                
//                ['EMPNO','value'],['ENAME','label'],
      ],
            where : {
                //'$DEPT.DEPTNO$' : 30, 
                ... condition
            },
            raw : true,
//            nest : true,
//            plain: true,

        });
    }

    const getEmp = (condition, limit, offset) => {
          
        return db.empDB.findAndCountAll({
           // distinct: true,
           
                  
      attributes:
            [
                //[db.sequelize.fn('DISTINCT', db.sequelize.col('EMP.EMPLOYEE_ID')) ,'employeeId2'],
                'employeeId',
                //'DEPT.departmentName'
                //[db.sequelize.col('DEPT.departmentName'),'departmentName']
                'firstName',
                'lastName',
                'email',
                'phoneNumber',
                'hireDate',
                'salary',
                'commissionPct',
                'departmentId',
                'jobId',
                'managerId',   

                
            ],
            
       /**/

/* */    
      include: [
        {
            //through:{
            attributes:['firstName','lastName'//'KODEATASAN',//'MANAGERNAME'
            ],//},//},
            model: db.managerDB,
           as:'Manager', 
           required:false,

           //where : {EMPNO : 20 },

        },
       {
            attributes:['departmentId','departmentName'//'KODEATASAN',//'MANAGERNAME'
            
            ],//},//},
            model: db.deptDB,
           as:'DEPT', 
           required:true,
           where : {
            //'$deptDB.DEPARTMENT_NAME$' : 100,    
            //... condition
           }
           //where : {EMPNO : 20 },

        },
        {
 //            attributes:['jobID','jobName'//'KODEATASAN',//'MANAGERNAME'
             
//             ],//},//},
             model: db.jobDB,
            as:'JOB', 
            required:true,
 
            //where : {EMPNO : 20 },
 
         }],
         
            //group: ["EMP.EMPLOYEE_ID"],

         /**/
       where : {
        //'$deptDB.DEPARTMENT_NAME$' : 100,    
        ... condition
       },//
       order :[
        'employeeId'
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

    const getMax=()=>
    {
        
        try{
            const max= db.empDB.findAll({
                attributes: [
                    //db.sequelize.fn('MAX', db.sequelize.col('EMPLOYEE_ID'))
                    [db.sequelize.fn('MAX', db.sequelize.literal('EMPLOYEE_ID')),"emp"]
                ],       
                raw : true,
                nest : true,
                plain: true,
    
              }) ;
              return max;
    
          }catch(err)
        {
            const errMessage = err.message || "Some error occurred while input EMP";
            if(err.original !== undefined) {
                console.log("err.original.code",err.original.code);
                console.log("err.message",err.message);
                res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
            } else {
                res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
            }
        }
            
    }
    const insertEmp = (empData, tr) => {
        
        const insertemp= db.empDB.create(empData,
            {
              transaction:tr
            }
        );
        return insertemp
    }

    //db.empDB.create
    const updateEmp=(employeeIdPrm,empData,tr)=>{
        const updateemp= db.empDB.update(empData,
            {
                where: {
                    employeeId: employeeIdPrm,
                },
 
              transaction:tr
            }
         );
         return updateemp

    }

    const deleteEmp=(employeeIdPrm,tr)=>{
        
        const updateemp= db.empDB.destroy(
            {
                where: {
                    employeeId: employeeIdPrm,
                },
 
              transaction:tr
            }
         );
         return deleteEmp

    }
 
    return {
        getOptionsEmp,
        insertEmp,
        getEmp,
        getMax,
        updateEmp,
        deleteEmp
    }
}


module.exports = empRepository