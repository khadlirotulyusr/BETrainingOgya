const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

function convertDate(date){
  let newDate = new Date(date);
  let formatDate = `${('00'+newDate.getDate()).slice(-2)}${('00'+(newDate.getMonth()+1)).slice(-2)}${newDate.getFullYear()+('00'+newDate.getHours()).slice(-2)+''+('00'+newDate.getMinutes()).slice(-2)+''+('00'+newDate.getSeconds()).slice(-2)}`
  return formatDate
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, process.env.BASE_PATH_FILE+req.folder);
  },
  filename: (req, file, cb) => {
    let newFileName;
    if(req.headers.category === 'SN'){
      newFileName = `LIST_SN_ID${req.headers.no_inbound_delivery}${convertDate(new Date(Date.now()).toLocaleString())}.csv`
    }else{
      let fileDate = file.originalname.substring(0,file.originalname.lastIndexOf('.'))+convertDate(new Date(Date.now()).toLocaleString());
      let fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.'))
      newFileName = fileDate+fileExtension;
    }
    return cb(null, newFileName);
  },
});

var uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single('file');

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
