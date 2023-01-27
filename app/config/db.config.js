require('dotenv').config();
module.exports = {
  development: {
    username:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
    logging: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    query: {
        raw: false
      },
    define: {
      createdAt: false,//'created_at',
      updatedAt: false,//'updated_at'
    },
    dialectOptions: {
        // dateFirst: 1,
        typeCast: true,
        dateStrings: true,
        timezone: "+07:00"
    },
    timezone: '+07:00'
  },
  staging: {
    username:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:  process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
    logging: false,
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: true
    },
    timezone: '+07:00'
  },
  production: {
    username:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:  process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
    logging: true,
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    charset: 'utf8',
    collate: 'utf8_general_ci',
    dialectOptions: {
      useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: true
    },
    timezone: '+07:00'
  }
};