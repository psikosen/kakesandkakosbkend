'use strict';

require('dotenv').config({path: __dirname + '/.env'});
const express = require("express");
const cors = require("cors");
const app = express();
let fs = require('fs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
 
var logging =  require("./src/routes/logs/log.js"); 
const bodyParser = require('body-parser');
const port = 3001;//process.env.PORT === 3001?3001:3000

var sessionHandler = session({
    secret : 'none',
    rolling : true,
    resave : true,
    saveUninitialized : true
});

app.use(cors());
app.use(json()); 
app.use(cookieParser());
app.use(sessionHandler);

var httpsOptions = {
    key: fs.readFileSync('certificates/private.key'),
    cert: fs.readFileSync('certificates/certificate.crt'),
    ca: fs.readFileSync('certificates/ca_bundle.crt'),
    checkServerIdentity: function (host, cert) {
      return undefined;
    }
  };
  
var secureServer = require('https').createServer(httpsOptions, app);

require('./src/routes')(app,{});
secureServer.listen(port,(req, res)=>{
    console.log('connected');
    console.log(port);
 });
 

 