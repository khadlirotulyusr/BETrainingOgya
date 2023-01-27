const express = require("express");
const bodyParser = require("body-parser");
var session = require('express-session');
const cors = require("cors");
const dotenv = require('dotenv').config();
const app = express();
const hmac = require("./app/utils/hmac");
 
global.__basedir = __dirname;

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/", hmac.requireHMac());

const db = require("./app/models");

let memoryStore = new session.MemoryStore();
//db.sequelize.sync();
app.use(session({
  secret: process.env.STORE_SECRET,
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));
//const keycloak = require('./app/config/keycloak.config').initKeycloak();
//app.use(keycloak.middleware());

// console.log(process.env.SIGNATURE_SECRET_KEY);
// const LoggerMiddleware = (req,res,next) =>{
//   console.log(`Logged ${req.kauth.grant.access_token.content.preferred_username} ${req.url} ${req.method} -- ${new Date()}`)
//   next();
// }
// app.use(LoggerMiddleware);
// drop the table if it already exist
//  db.sequelize.sync({ force: true }).then(() => {
//    console.log("Drop and re-sync db.");
//  });
// console.log(app)

// health check

// machine

require("./app/routes/bonus/bonus.routes")(app);
require("./app/routes/emp/emp.routes")(app);
require("./app/routes/dept/dept.routes")(app);
require("./app/routes/job/job.routes")(app);

// dummy health check
app.get('/api/trainningNodejs', (req, res) => {
  res.status(200).send('Welcome to Tranning Nodejs')
});
// set port, listen for requests
const PORT = process.env.PORT || 3535;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
