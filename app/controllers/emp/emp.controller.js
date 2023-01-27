const db = require("../../models");
//const Op = db.Sequelize.Op;
const jsonMessage = require("../../json/jsonMessage");
const empRepo = require("../../repositories/emp/emp.repository")(db);
const { getPagination, getPagingData } = require("../../utils/pagination");
exports.getAll = async (req, res) => {
  const { page, size, field, value, type } = req.query;
  try {
    var condition = null;
    const { limit, offset } = getPagination(page - 1, size);

    if (field && value) {
      const params = field;
      condition = { ["$" + params + "$"]: { $like: `%${value}%` } };
    }

    var data = await empRepo.getEmp(condition, limit, offset);

    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data EMP`,
      //"indonesia" : `Berhasil Mengambil Data EMP`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data EMP";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};

exports.getOptionsEmp = async (req, res) => {
  const { page, size, field, value, type } = req.query;
  try {
    var condition = null;
    const { limit, offset } = getPagination(page - 1, size);

    if (field && value) {
      const params = field;
      condition = { [params]: { $like: `%${value}%` } };
    }

    var data = await empRepo.getOptionsEmp(condition, limit, offset);

    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data EMP`,
      //"indonesia" : `Berhasil Mengambil Data EMP`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data EMP";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};

exports.getEmp = async (req, res) => {
  const { page, size, field, value } = req.query;
  try {
    var condition = null;
    const { limit, offset } = getPagination(page - 1, size);

    if (field && value) {
      console.log("field", field);
      const params = field;
      //       var strArray = params.split(".");
      ///var params1=""; var params2=""
      //params1=strArray[0];params2=strArray[1];
      console.log("condition");
      if (process.env.DIALECT === "oracle") {
        //console.log('params1',params1);

        //console.log('params2',params2);

        condition = { [field]: { $like: `%${value}%` } };

        //console.log('condition',condition)
      } else {
        const Op = db.Sequelize.Op;
        condition = { [params]: { [Op.ilike]: `%${value}%` } };
      }
    }
    var data = await empRepo.getEmp(condition, limit, offset);

    /*    
      for (intLoop=0;intLoop<=data.rows.length-1;intLoop++)
      {
        var subData = await empRepo.getManagerRecursive(
          data.rows[intLoop])

        data.rows[intLoop]=subData;
        ///console.log("subData",subData,intLoop)
//        console.log(intLoop,data.rows[intLoop])

      }/**/
    //console.log("data",data)
    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data EMP`,
      //"indonesia" : `Berhasil Mengambil Data EMP`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data EMP";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};
exports.insertEmp = async (req, res) => {
  const tr = await db.sequelize.transaction();
  let hireDateParm = Date.parse(req.body.hireDate);
  //console.log("hireDate",hireDateParm)
  try {
    const getmax = await empRepo.getMax();
    var dataEmp = {
      employeeId: getmax.emp + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      departmentId: req.body.departmentId,
      managerId: req.body.managerId,
      phoneNumber: req.body.phoneNumber,
      hireDate: req.body.hireDate,
      salary: req.body.salary,
      commissionPct: req.body.commissionPct,
      jobId: req.body.jobId,
    };

    const tempIEmp = await empRepo.insertEmp(dataEmp, tr);
    //console.log("tempIEmp",tempIEmp)
    let message = {
      english: `Successfully Insert EMP`,
      indonesia: `Berhasil Input EMP`,
    };
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempIEmp));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while input EMP";
    if (err.original !== undefined) {
      console.log("err.original.code", err.original.code);
      console.log("err.message", err.message);
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
    await tr.rollback();
  }
};
exports.deleteEmp = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    console.log("req.body.employeeId", req.body.employeeId);
    const tempIEmp = await empRepo.deleteEmp(req.body.employeeId, tr);
    let message = {
      english: `Successfully Update EMP`,
      indonesia: `Berhasil Update EMP`,
    };
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempIEmp));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while input EMP";
    if (err.original !== undefined) {
      console.log("err.original.code", err.original.code);
      console.log("err.message", err.message);
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
    await tr.rollback();
  }
};

exports.updateEmp = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    var dataEmployee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      jobID: req.body.jobID,
      managerID: req.body.manAagerID,
      hireDate: req.body.hireDate,
      salary: req.body.salary,
      email: req.body.email,
      commissionPct: req.body.commissionPct,
      departmentID: req.body.departmentID,
    };
    const tempIEmp = await empRepo.updateEmp(req.body.employeeId, dataEmployee, tr);
    let message = {
      english: `Successfully Update EMP`,
      indonesia: `Berhasil Update EMP`,
    };
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempIEmp));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while input EMP";
    if (err.original !== undefined) {
      console.log("err.original.code", err.original.code);
      console.log("err.message", err.message);
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
    await tr.rollback();
  }
};
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
