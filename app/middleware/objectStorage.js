const axios = require('axios');
const fs = require("fs");
var https = require('https');
const moment = require('moment');
const certPath = process.env.BASE_PATH_CERT_FILE;

// Configure the Certificate
const requestConfig = {
    headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': process.env.HCP_TOKEN,
    },
    responseType:'arraybuffer',
    httpsAgent: new https.Agent({ ca: certPath, rejectUnauthorized: false })
};

const requestConfigWithParams = {
    headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': process.env.HCP_TOKEN
    },
    params: {
        'type': 'directory'
    },
    httpsAgent: new https.Agent({ ca: certPath, rejectUnauthorized: false })
};

const convertFileName = (content, filename) => {
    let newFileName = '';
    if(content.fields.category === 'SN'){
      newFileName = `LIST_SN_ID${content.fields.no_inbound_delivery}${moment(new Date(Date.now())).format('DDMMYYYYHHmmss')}.csv`
    }else{
      let fileDate = filename.substring(0,filename.lastIndexOf('.'))+moment(new Date(Date.now())).format('DDMMYYYYHHmmss');
      let fileExtension = filename.substring(filename.lastIndexOf('.'))
      newFileName = fileDate+fileExtension;
    }
    return newFileName;
}

// FILE SECTION
// This function is for upload file to Object Storage
const uploadFile = async (path, filename, content) => {
    let temp;
    let result={};
    try {
        const newFileName = convertFileName(content, filename)
        temp = await axios.put(`${process.env.HCP_URL}/${path}/${newFileName}`, fs.createReadStream(content.files.file.path), requestConfig)
        result.fileSize = temp.config.data.bytesRead;
        result.status = temp.status;
        result.filename = newFileName;
        result.from = "Object Storage - HCP";
        result.message = "Status " + temp.status + " - " + temp.statusText;
    } catch (error) {
        result.from = "Object Storage - HCP";
        result.message = error.toString();
    }
    return result;
}

// This function is for get file from Object Storage
const getFile = async (path, filename) => {
    let temp;
    let result={};
    try {
        temp = await axios.get(`${process.env.HCP_URL}/${path}/${filename}`, requestConfig)
        result.statusCode = temp.status;
        result.data = temp.data;
        result.from = "Object Storage - HCP";
        result.message = "Status " + temp.status + " - " + temp.statusText;
    } catch (error) {
        result.statusCode = error.response.status;
        result.from = "Object Storage - HCP";
        result.message = error.toString();
    }
    return temp;
}

// This function is for delete file from Object Storage
const deleteFile = async (path, filename) => {
    let temp;
    let result={};
    try {
        temp = await axios.delete(`${process.env.HCP_URL}/${path}/${filename}`, requestConfig)
        result.from = "Object Storage - HCP";
        result.message = "Status " + temp.status + " - " + temp.statusText;
    } catch (error) {
        result.from = "Object Storage - HCP";
        result.message = error.toString();
    }
    return result;
}

// FOLDER SECTION
// This function is for create directory in Object Storage
const createDirectory = async (path, directoryName) => {
    let temp;
    let result={};
    try {
        temp = await axios.put(`${process.env.HCP_URL}/${path}${directoryName}`, requestConfigWithParams)
        result.from = "Object Storage - HCP";
        result.message = "Status " + temp.status + " - " + temp.statusText;
    } catch (error) {
        result.from = "Object Storage - HCP";
        result.message = error.toString();
    }
    return result;
}

// This function is for delete empty directory in Object Storage
const deleteEmptyDirectory = async (path, directoryName) => {
    let temp;
    let result={};
    try {
        temp = axios.delete(`${process.env.HCP_URL}/${path}${directoryName}`, requestConfig)
        result.data = temp.data.request.path;
        result.message = "Status " + temp.status + " - " + temp.statusText;
    } catch (error) {
        result.from = "Object Storage - HCP";
        result.message = error.toString();
    }
    return result;
}

module.exports = {
    uploadFile,
    getFile,
    deleteFile,
    createDirectory,
    deleteEmptyDirectory
};