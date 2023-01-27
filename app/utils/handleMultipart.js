const formidable = require('formidable');

let opt = { 
    multiples: true,
    // maxFileSize: process.env.MAX_TOTAL_FILE_SIZE,
    maxFileSize: process.env.MAX_FILE_SIZE,
}

const whitelistFileType = [
    'image/png',
    'text/csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const getFileMultipart = async (req) => {
    const form = formidable(opt);

    return new Promise(function (resolve, reject) {
        form.parse(req, function (err, fields, files) {
            console.log(files.file.type)
            if(files.file.type && !whitelistFileType.includes(files.file.type)){
                reject("Please choose a JPEG, JPG, PNG, PDF, EXCEL, CSV, or DOC file.")
            }
            form.onPart = part => {
                part.filename = files.file.name;
                part.mime = files.file.type
            }
            if (err) {
                reject(err);
                return;
            }
            resolve({files, fields, totalFileSize:form._fileSize});
        });
    })
}

module.exports = {
    getFileMultipart
};