const db = require("../../models");
//const Op = db.Sequelize.Op;
const jsonMessage = require("../../json/jsonMessage");
const jobRepo = require("../../repositories/job/job.respository")(db);
const {getPagination, getPagingData} = require('../../utils/pagination')

exports.getAllJobForOption = async (req, res) => {

  const { page, size, field, value , type} = req.query;
  try{

   
      var condition =  null
      const { limit, offset } = getPagination(page - 1, size);

      if(field && value){
        const params = field;
         condition = {[paramss]:{ $like : `%${value}%` }};
      }
      
      var data= await jobRepo.getAllJobForOption(condition,  limit, offset)
      
 /**/     

      const response = getPagingData(data, page, limit);
      let message={
        "english" : `Successfully Retrieved Data JOB` ,
        //"indonesia" : `Berhasil Mengambil Data EMP`,
      }
      res.send(jsonMessage.jsonSuccess(message, response));
  } catch(err) {
    const errMessage = err.message || "Some error occurred while get Data JOB";
    if(err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
    }
  }
}