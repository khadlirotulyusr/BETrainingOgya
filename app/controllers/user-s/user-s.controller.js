const db = require("../../models");
//const Op = db.Sequelize.Op;
const jsonMessage = require("../../json/jsonMessage");
const userRepo = require("../../repositories/user-s/user-s.repository")(db);
const { getPagination, getPagingData } = require("../../utils/pagination");
const { condition } = require("sequelize");


exports.getOptionsUser = async (req, res) => {
    const { page, size, field, value, type } = req;
    const url = require('url')
    try {
        var condition = null;
        const { limit, offset } = getPagination(page - 1, size);

        if (field !== null && value !== null) {
            const params = field;
            var noTelepon = req.query.noTelepon ? req.query.noTelepon : null
            var noRekening = req.query.noRekening

            var querys = url.parse(req.url, true).query;
            const { paramm, fieldd } = querys
            console.log(querys, '>>>')
            console.log(paramm, 'paramm');
            console.log(fieldd, 'filedd')
            condition = req.query
            // const arrCondition = []
            // arrCondition.push(req.query)

            // condition = { noTelepon : {$like: `%${noTelepon}%`}};


            // condition = 
            // condition = { [params]: { $like: `%${value}%` } };


            //     const Op = db.Sequelize.Op;
            // condition = { [params]: { [Op.ilike]: `%${value}%` } };
            console.log(req.query);
            console.log(req.query.data);
            console.log(req.params);
            // console.log(value);
        }

        var data = await userRepo.getOptionsUser(condition, limit, offset);

        const response = getPagingData(data, page, limit);
        let message = {
            english: `Successfully Retrieved Data User`,
            //"indonesia" : `Berhasil Mengambil Data EMP`,
        };
        res.send(jsonMessage.jsonSuccess(message, response));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while get Data User";
        if (err.original !== undefined) {
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
    }
};