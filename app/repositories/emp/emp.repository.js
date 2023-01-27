function empRepository(db) {
    const getManagerRecursive = async (empManager) => {

        let Managers = await db.empDB.findAll({
            where: {
                EMPNO: empManager.KODEMANAGER
            },
            raw : true
        });
        if (Managers.length > 0) {
            const promises = {};
            /*Managers.forEach(emps => {
                promises.push(getManagerRecursive(emps ));
            });

            */
            //promises.Managers=empManager
            var manager=Managers[0];
            var test=Managers.reduce(
                (obj, item) => Object.assign(obj, { [item.key]: item.value }), {});
                empManager['Managers'] = manager;//Managers;//await Promise.all(empManager);
            

        }
        //else empManager['Managers'] = []; 

        return empManager;
      };




      const getAllEmpQuery = () => {
        //console.log("Mysql", db.sequelize.whereQuery);    
        return db.sequelize.query("select * from emp", { type: db.sequelize.QueryTypes.SELECT });

    }

    const getOptionsEmp = (condition, limit, offset) => {
        //console.log("Mysql", db.sequelize.whereQuery);    
        return db.empDB.findAndCountAll({
            attributes:[['EMPNO','value'],['ENAME','label'],
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

    const getAllEmp = (condition, limit, offset) => {
        //console.log("Mysql", db.sequelize.whereQuery);    
        return db.empDB.findAndCountAll({
            attributes:['EMPNO','ENAME','JOB','HIREDATE'
            ,'KODEMANAGER',
            [db.sequelize.col('DEPT.DEPTNO'),'DEPT_NO'],
      ],
/*
        include: [
            //through : 
            {
                //through:{
                attributes:['KODEMANAGER',//'KODEATASAN',//'MANAGERNAME'
            /**/
/*            ],//},//},
               model: db.managerDB,
               as:'Manager', 
               required:false,

               //where : {EMPNO : 20 },
 
            }],*/
            include:[{
                model:db.deptDB,
                as: 'DEPT',
                required:true,
              //  through:{
                    attributes:['DNAME']
                //}
                ,
/**/

     /* 
                where : {
                    DEPTNO : db.sequelize.col('EMP.DEPTNO')
                    
                
                }
/**/
            }],
            where : {
                //'$DEPT.DEPTNO$' : 30, 
                ... condition
            },//

            limit, 
            offset,
            raw : true,
//            nest : true,
//            plain: true,

        });
    }
    const getOREmpMysql = (condition, limit, offset) => {
        const OP=db.Sequelize.Op;
        console.log("db.sequelize",db.Sequelize.Op)
        //console.log("Mysql", db.sequelize.whereQuery);    
        return db.empDB.findAndCountAll({
            attributes:['EMPNO',['EMPNO','empNoLama'],'ENAME','JOB','HIREDATE'
            ,'KODEMANAGER','SALARY','COMMITION',
            [db.sequelize.col('DEPT.DEPTNO'),'DEPT_NO'],
      ],

            include:[{
                model:db.deptDB,
                as: 'DEPT',
                required:true,
              //  through:{
                    attributes:['DNAME','DEPTNO']
                //}
                ,
/**/

            }],
            where : {
            [OP.or] :[
            {
                '$DEPT.DEPTNO$':20

            },
            {
                '$DEPT.DEPTNO$':30,
            }
        ],
                ... condition
            },//

            limit, 
            offset,
            raw : true,
//            nest : true,
//            plain: true,

        });
    }


    const getOREmpOracle = (condition, limit, offset) => {
        //const OP=db.Sequelize.Op;
        //console.log("db.sequelize",db.Sequelize.Op)
        //console.log("Mysql", db.sequelize.whereQuery);    
        return db.empDB.findAndCountAll({
            attributes:['EMPNO',['EMPNO','empNoLama'],'ENAME','JOB','HIREDATE'
            ,'KODEMANAGER','SALARY','COMMITION',
            [db.sequelize.col('DEPT.DEPTNO'),'DEPT_NO'],
      ],

        include: [
            //through : 
            {
                //through:{
                attributes:['KODEMANAGER',//'KODEATASAN',//'MANAGERNAME'
            /**/
            ],//},//},
               model: db.managerDB,
               as:'Manager', 
               required:true,

               //where : {EMPNO : 20 },
 
            }],
            include:[{
                model:db.deptDB,
                as: 'DEPT',
                required:true,
              //  through:{
                    attributes:['DNAME','DEPTNO']
                //}
                ,
/**/

     /* */ 
                where : {
                    $or :[
                        {
                            DEPTNO :30      
                        },
                        {
                            DEPTNO :20
                        }
                    ] 
                
                }
/**/
            }],
            where : {
              ... condition
          },//


            limit, 
            offset,
            raw : true,
//            nest : true,
//            plain: true,

        });
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
    const updateEmp=(empNoLama,empData,tr)=>{
        const updateemp= db.empDB.update(empData,
            {
                where: {
                    empNo: empNoLama,
                },
 
              transaction:tr
            }
         );
         return updateemp

    }
 
    return {
        getOptionsEmp,
        getAllEmp,
        insertEmp,
        getManagerRecursive,
        getOREmpMysql,
        getOREmpOracle,
        updateEmp,
        getAllEmpQuery
    }
}


module.exports = empRepository