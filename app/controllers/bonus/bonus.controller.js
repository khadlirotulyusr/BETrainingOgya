const db = require("../../models");
//const Op = db.Sequelize.Op;
const jsonMessage = require("../../json/jsonMessage");
const bonusRepo = require("../../repositories/bonus/bonus.repository")(db);
const {getPagination, getPagingData} = require('../../utils/pagination')

exports.getAll = async (req, res) => {

  const { page, size, field, value , type} = req.query;
  try{

    
      var condition =  null
      const { limit, offset } = getPagination(page - 1, size);

      if(field && value){
        const params = field;
         condition = {[params]:{ $like : `%${value}%` }};
      }
      const data = await bonusRepo.getAllBonus(condition,  limit, offset)
      //console.log("data=",data)
      const response = getPagingData(data, page, limit);
      let message={
        "english" : `Successfully Retrieved Data Bonuss` ,
        //"indonesia" : `Berhasil Mengambil Data Bonus`,
      }
      res.send(jsonMessage.jsonSuccess(message, response));
  } catch(err) {
    const errMessage = err.message || "Some error occurred while get Data Bonus";
    if(err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
    }
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

