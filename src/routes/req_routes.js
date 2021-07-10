"use strict";
 
const HOSTNAME = process.env.HOSTNAME;
const PASSWORD = process.env.SQL_PASSWORD;
const USER = process.env.SQL_USER;
const DATABASE = process.env.SQL_DATABASE; 

let busboy = require('connect-busboy');
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ limits: {fileSize: 1000000, files:1}}).any();

var path = require('path');
var time = new Date();
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');

var logging =  require("./logs/log.js");
const express = require("express");
var log = new logging();
let DatabaseManagment = require("./database/DatabaseManagement.js"); 
let CustomerManager = require("./customers/CustomerManager");
let EventManager = require("./events/EventManager.js");
let Authentification = require("./Authentification.js"); 

// End Points
module.exports = function(app,db){ 
	 app.use(bodyParser.json());
	 app.use(bodyParser.urlencoded({extended:true}));
	 app.use(busboy());
	 app.use(express.static(path.join(__dirname, '../public')));
	 app.use(function(req, res, next) {
		  res.header('Access-Control-Allow-Origin', '*');
		  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		  res.header('Access-Control-Allow-Headers', 'Content-Type');
		  next();
	 });
	 
	 app.get('/api/customers',function(req,res){
		  CustomerManager.GetAllCustomers(function(err,data){
				if(err){
					log.error(err);
					res.status(500).send(err);
				}else{
					res.status(200).send(data);
				}
		  });
	 });
	 
	 app.get('/api/customers/:id',function(req,res){
		  CustomerManager.GetCustomer(req.params.id,function(err,data){
				if(err){
					log.error(err);
					res.status(500).send(err);
				}else{
					res.status(200).send(data);
				}
		  });
	 });
	 
	 app.post('/api/customers',function(req,res){
		  CustomerManager.AddCustomer(req.body,function(err,data){
				if(err){
					log.error(err);
					res.status(500).send(err);;
     }});});

	 app.use(bodyParser.urlencoded({ extended: true }));
   app.use(busboy());
  
   app.post('/ADMINLOGIN',(req,res)=>{
    let con = new DatabaseManagment();
    let auth = new Authentification();
    console.log('working end point admin login')
        auth.ADMINLOGIN(req,res,con);
   }); 
   
   app.post('/CHECKIFUSEREXISTS',(req,res)=>{
    let con = new DatabaseManagment();
    let cus = new CustomerManager();
    console.log('working end point check if CHECKIFUSEREXISTS')
        cus.CHECKIFUSEREXISTS(req,res,con);
   }); 
  
   app.post('/CREATECUSTOMER',(req,res)=>{
    let con = new DatabaseManagment();
    let cus = new CustomerManager();
    console.log('working end point   CUSTOMEREMAILADDESS')
        cus.CREATECUSTOMER(req,res,con);
   }); 
  
   app.post('/GETCUSTOMER',(req,res)=>{
    let con = new DatabaseManagment();
    let cus = new CustomerManager();
    console.log('working end      GETCUSTOMER')
        cus.GETCUSTOMER(req,res,con);
   }); 
   
   app.post('/CREATEKAKESEVENT',(req,res)=>{
    let con = new DatabaseManagment();
    let evn = new EventManager();
    console.log('working end   CREATEKAKESEVENT')
        evn.CREATEKAKESEVENT(req,res,con);
   });

   app.post('/GETEVENT',(req,res)=>{
    let con = new DatabaseManagment();
    let evn = new EventManager();
    console.log('working end     GETEVENT')
        evn.GETEVENT(req,res,con);
   });

   app.post('/GETALLEVENTS',(req,res)=>{
    let con = new DatabaseManagment();
    let evn = new EventManager();
    console.log('working end   GETALLEVENTS')
        evn.GETALLEVENTS(req,res,con);
   });

   app.post('/DELETEEVENT',(req,res)=>{
    let con = new DatabaseManagment();
    let evn = new EventManager();
    console.log('working end  DELETEEVENT')
        evn.DELETEEVENT(req,res,con);
   });

  
}

