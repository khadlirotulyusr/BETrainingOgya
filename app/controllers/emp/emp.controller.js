const db = require("../../models");
//const Op = db.Sequelize.Op;
const jsonMessage = require("../../json/jsonMessage");
const empRepo = require("../../repositories/emp/emp.repository")(db);
const {getPagination, getPagingData} = require('../../utils/pagination')

exports.getAll = async (req, res) => {

  const { page, size, field, value , type} = req.query;
  try{

   
      var condition =  null
      const { limit, offset } = getPagination(page - 1, size);

      if(field && value){
        const params = field;
         condition = {[paramss]:{ $like : `%${value}%` }};
      }
      
      var data= await empRepo.getOREmpMysql(condition,  limit, offset)
      
 /**/     
      for (intLoop=0;intLoop<=data.rows.length-1;intLoop++)
      {
        var subData = await empRepo.getManagerRecursive(
          data.rows[intLoop])
        data.rows[intLoop]=subData;

      }/**/

      const response = getPagingData(data, page, limit);
      let message={
        "english" : `Successfully Retrieved Data EMP` ,
        //"indonesia" : `Berhasil Mengambil Data EMP`,
      }
      res.send(jsonMessage.jsonSuccess(message, response));
  } catch(err) {
    const errMessage = err.message || "Some error occurred while get Data EMP";
    if(err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
    }
  }
}


exports.getOptionsAll = async (req, res) => {

  const { page, size, field, value , type} = req.query;
  try{

   
      var condition =  null
      const { limit, offset } = getPagination(page - 1, size);

      if(field && value){
        const params = field;
         condition = {[paramss]:{ $like : `%${value}%` }};
      }
      
      var data= await empRepo.getOptionsEmp(condition,  limit, offset)
      
 
      const response = getPagingData(data, page, limit);
      let message={
        "english" : `Successfully Retrieved Data EMP` ,
        //"indonesia" : `Berhasil Mengambil Data EMP`,
      }
      res.send(jsonMessage.jsonSuccess(message, response));
  } catch(err) {
    const errMessage = err.message || "Some error occurred while get Data EMP";
    if(err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
    }
  }
}





exports.getOrMysqlAll = async (req, res) => {

  const { page, size, field, value , type} = req.query;
  try{

      var condition =  null
      const { limit, offset } = getPagination(page - 1, size);
      const Op = db.Sequelize.Op;

      if(field && value){
        const params = field;
         condition = {[params]:{ [Op.like] : `%${value}%` }};
      }
      
      var data= await empRepo.getOREmpMysql(condition,  limit, offset)
      
 /**/     
      for (intLoop=0;intLoop<=data.rows.length-1;intLoop++)
      {
        var subData = await empRepo.getManagerRecursive(
          data.rows[intLoop])
        data.rows[intLoop]=subData;

      }/**/

      const response = getPagingData(data, page, limit);
      let message={
        "english" : `Successfully Retrieved Data EMP` ,
        //"indonesia" : `Berhasil Mengambil Data EMP`,
      }
      res.send(jsonMessage.jsonSuccess(message, response));
  } catch(err) {
    const errMessage = err.message || "Some error occurred while get Data EMP";
    if(err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
    }
  }
}
exports.getOrOrcleAll = async (req, res) => {

  const { page, size, field, value , type} = req.query;
  try{

   
      var condition =  null
      const { limit, offset } = getPagination(page - 1, size);

      if(field && value){
        const params = field;
         condition = {[params]:{ $like : `%${value}%` }};
      }
      var data= await empRepo.getOREmpOracle(condition,  limit, offset)
      
 /**/     
      for (intLoop=0;intLoop<=data.rows.length-1;intLoop++)
      {
        var subData = await empRepo.getManagerRecursive(
          data.rows[intLoop])
        data.rows[intLoop]=subData;

      }/**/

      const response = getPagingData(data, page, limit);
      let message={
        "english" : `Successfully Retrieved Data EMP` ,
        //"indonesia" : `Berhasil Mengambil Data EMP`,
      }
      res.send(jsonMessage.jsonSuccess(message, response));
  } catch(err) {
    const errMessage = err.message || "Some error occurred while get Data EMP";
    if(err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
    }
  }
}
exports.insertEmp = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    var dataAccessories=
    {
      EMPNO:req.body.EMPNO,
      ENAME:req.body.ENAME,
      JOB:req.body.JOB,
      MANAGER:req.body.MANAGER,
      HIREDATE:req.body.HIREDATE,
      SALARY:req.body.SALARY,
      COMMITION:req.body.COMMITION,
      DEPTNO:req.body.DEPTNO
  
    }
    const tempIEmp = await empRepo.insertEmp(dataAccessories, tr);
    //console.log("tempIEmp",tempIEmp)
    let message = {
      "english" : `Successfully Insert EMP` ,
      "indonesia" : `Berhasil Input EMP`,
    }
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempIEmp));

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
    await tr.rollback();


  }
}

exports.updateEmp = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    var dataAccessories=
    {
      EMPNO:req.body.EMPNO,
      ENAME:req.body.ENAME,
      JOB:req.body.JOB,
      MANAGER:req.body.MANAGER,
      HIREDATE:req.body.HIREDATE,
      SALARY:req.body.SALARY,
      COMMITION:req.body.COMMITION,
      DEPTNO:req.body.DEPTNO
  
    }
    const tempIEmp = await empRepo.updateEmp(req.body.empNoLama,
      dataAccessories, tr);
    //console.log("tempIEmp",tempIEmp)
    let message = {
      "english" : `Successfully Insert EMP` ,
      "indonesia" : `Berhasil Input EMP`,
    }
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempIEmp));

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
    await tr.rollback();


  }
}
/*
exports.getDetail = async (req, res) => {
  const {id} = req.params;
  const tr = await db.sequelize.transaction();

  try {
    if (name === null) {
      let message = {
        "english": 'You are not Authorized',
        "indonesia": `Anda Tidak Memiliki Hak Akses`,
      }
      res.send(jsonMessage.jsonSuccess(message, []));
    } else {
      let myData = await registrasiAssRepo.getDetail(id)
      let message = {
        "english": `Successfully Retrieved Data Detail Stock`,
        "indonesia": `Berhasil Mengambil Data Detail Stock`,
      }
      await tr.commit();
      res.send(jsonMessage.jsonSuccess(message, myData[0]));
    }
  } catch (err) {
    // /console.log('449 err :>> ', err);
    const errMessage = err.message || "Some error occurred while Retrieving Detail Stock";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
    }
    await tr.rollback();
  }
}
*/

