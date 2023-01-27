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
      const response = getPagingData(data, page, limit);
      let message={
        "english" : `Successfully Retrieved Data Bonuss` ,
        "indonesia" : `Berhasil Mengambil Data Bonus`,
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

exports.insertData = async (req, res) => {
  const tr = await db.sequelize.transaction();
  const body = req.body;

  try {
    const name = req.kauth.grant.access_token.content.preferred_username || null;
    if (name === null) {
      let message = {
        "english": 'You are not Authorized',
        "indonesia": `Anda Tidak Memiliki Hak Akses`,
      }
      res.send(jsonMessage.jsonSuccess(message, []));
    } else {
      let lastOrderId = await registrasiAssRepo.getLastOrderId();
      let orderId = GenerateOrderId.generateOrderId(OrderIdCodeConstant.ORDER_ID_REGISTRASI_ASSET, lastOrderId ? lastOrderId.id_reg_asset : null)
      body.id_reg_asset  = orderId;
      let myData = await registrasiAssRepo.insertRegisterAsset(body)
      const list_asset = body.list_asset;
            list_asset.map(async (item) => {
              await listregisterAssRepo.insertListAsset({...item, id_reg_asset:orderId, created_by: name, updated_by: name})
            })
            await activityRepo.createActivity({orderId: orderId, wsid: '-',created_by: name, updated_by: name, id_status: 92, id_master_activity: 60 }, tr)
            await auditRepo.createAudit({orderId: orderId, created_by: name, updated_by: name, id_status: 92, id_master_activity: 60 }, tr)
                  

      let message = {
        "english": `Successfully Retrieved Data Detail Stock`,
        "indonesia": `Berhasil Mengambil Data Detail Stock`,
      }
      await tr.commit();
      res.send(jsonMessage.jsonSuccess(message, myData));
    }
  } catch (err) {
    const errMessage = err.message || "Some error occurred while Retrieving Detail Stock";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
    }
    await tr.rollback();
  }
}


exports.updateData = async (req, res) => {
  const tr = await db.sequelize.transaction();
  const {id} = req.params;
  const body = req.body;

  try {
    const name = req.kauth.grant.access_token.content.preferred_username || null;
    if (name === null) {
      let message = {
        "english": 'You are not Authorized',
        "indonesia": `Anda Tidak Memiliki Hak Akses`,
      }
      res.send(jsonMessage.jsonSuccess(message, []));
    } else {
     
      let myData = await registrasiAssRepo.updateRegistrasiAsset(id, body)
        await activityRepo.updateActivity({ wsid: '-',created_by: name, updated_by: name,  id_master_activity: 60 }, id, tr)
        await auditRepo.createAudit({orderId: id, created_by: name, updated_by: name,  id_master_activity: 60 }, tr)
                  

      let message = {
        "english": `Successfully Retrieved Data Detail Stock`,
        "indonesia": `Berhasil Mengambil Data Detail Stock`,
      }
      await tr.commit();
      res.send(jsonMessage.jsonSuccess(message, myData));
    }
  } catch (err) {
    const errMessage = err.message || "Some error occurred while Retrieving Detail Stock";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
    }
    await tr.rollback();
  }
}


  exports.masterTindakan = async (req, res) => {
    const tr = await db.sequelize.transaction();
  
    try {
      const name = 'ogya';
      if (name === null) {
        let message = {
          "english": 'You are not Authorized',
          "indonesia": `Anda Tidak Memiliki Hak Akses`,
        }
        res.send(jsonMessage.jsonSuccess(message, []));
      } else {
       
        let myData = await masterTindakanRepo.getAll()
        
        let message = {
          "english": `Successfully Retrieved Data Detail Stock`,
          "indonesia": `Berhasil Mengambil Data Detail Stock`,
        }
        await tr.commit();
        res.send(jsonMessage.jsonSuccess(message, myData));
      }
    } catch (err) {
      const errMessage = err.message || "Some error occurred while Retrieving Detail Stock";
      if (err.original !== undefined) {
        res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
      } else {
        res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
      }
      await tr.rollback();
    }
  }