const fs = require("fs");
const csv = require('csv-parser');

const readCsv = (file) => {
    let serialNumberData = [];
    return new Promise((resolve, reject) => {
        file.pipe(csv())
        .on('data', (row) => serialNumberData.push(row))
        .on('error', (err) => reject(err))
        .on('end', () => {
            resolve(serialNumberData);
        });
    });
}

const convertCsvData = (data) => {
    data = Buffer.isBuffer(data) ? Buffer.from(data).toString('binary') : data;
    let tempData = data.split(/\r\n|\n|\r/);
    let headers = tempData[0].split(',');
    let rows = [];

    for (let i = 1; i < tempData.length; i++) {
        let tempRows = tempData[i].split(',');
        if (tempRows.length == headers.length) {
            let tempObj = {};
            for (let j = 0; j < headers.length; j++) {
                tempObj[headers[j].trim()] = tempRows[j].trim();
            }
            rows.push(tempObj);
        }
    }
    
    return rows;
}

module.exports = {
    readCsv,
    convertCsvData
}