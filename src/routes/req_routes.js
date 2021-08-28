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
let ImageManagement = require("./ImageManagement.js"); 



module.exports = function(app,db){ 
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use(busboy());
  
   app.post('/ADMINLOGIN',(req,res)=>{
    let con = new DatabaseManagment();
    let auth = new Authentification();
    console.log('working end point admin login')
        auth.ADMINLOGIN(req,res,con);
   }); 
   
   app.get('/GETALLCUSTOMERS',(req,res)=>{
    let con = new DatabaseManagment(); 
    let cus = new CustomerManager();
    console.log('working end  GETALLCUSTOMERS')
        cus.GETALLCUSTOMERS(res, con);
   });
   
   app.post('/UPDATECUSTOMER',(req,res)=>{
    let con = new DatabaseManagment();
    let cus = new CustomerManager();
    console.log('working end point check if UPDATECUSTOMER')
        cus.UPDATECUSTOMER(req,res,con);
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
    console.log('working end GETCUSTOMER')
        cus.GETCUSTOMER(req,res,con);
   }); 

   app.post('/DELETECUSTOMER',(req,res)=>{
    let con = new DatabaseManagment();
    let cus = new CustomerManager();
    console.log('working end DELETE CUSTOMER')
        cus.DELETECUSTOMER(req,res,con);
   }); 
   
   app.post('/CREATEKAKESEVENT',(req,res)=>{
    let con = new DatabaseManagment();
    let evn = new EventManager();
    console.log('working end   CREATEKAKESEVENT')
        evn.CREATEKAKESEVENT(req,res,con);
   });

   app.post('/UPDATEEVENT',(req,res)=>{
    let con = new DatabaseManagment(); 
    let evn = new EventManager();
    console.log('working end point check if UPDATEEVENT')
        evn.UPDATEEVENT(req,res,con);
   });  

   app.post('/GETEVENT',(req,res)=>{
    let con = new DatabaseManagment();
    let evn = new EventManager();
    console.log('working end - GETEVENT')
        evn.GETEVENT(req,res,con);
   });

   app.get('/GETALLEVENTS',(req,res)=>{
    let con = new DatabaseManagment();
    let evn = new EventManager();
    console.log('working end  - GETALLEVENTS')
        evn.GETALLEVENTS(req,res,con);
   });
 
   app.post('/DELETEEVENT',(req,res)=>{
    let con = new DatabaseManagment();
    let evn = new EventManager();
    console.log('working end  - DELETEEVENT')
        evn.DELETEEVENT(req,res,con);
   });

   app.post('/uploadImage', (req,res, next)=>{
    console.log('Entering uploadImage');
    upload(req, res, function (err) {
       if (err instanceof multer.MulterError) {
         // A Multer error occurred when uploading.
       } else if (err) {
         // An unknown error occurred when uploading.
       }

       var files = req.files;
       console.log('==================================');
       console.log(req.file);
       console.log(req.params);
       console.log('=================================');
       console.log(req.body);
       console.log('=================================');

       let json = req.body; 
       let folder = 'images';
       let fileType = 'png';

         
       let path =`./${folder}/${json.ImageName}.${fileType}`;
       console.log(path);

           fs.writeFile(path, Buffer.from(files[0].buffer), function(err,fds){
               if (err) throw err
               console.log(fds);
               console.log('File saved.'); 
               
              let im = new ImageManagement();
              im.insertImg(con,res,{FOODNAME:files.FOODNAME,FOODNAMEFULLNAME: files.FOODNAMEFULLNAME, FOODIMG: path}); 
         
           });
       console.log(files);
       console.log(json);
      });
    });


   app.post('/UPDATEUSRIMG',(req,res)=>{ 
    let con = new DatabaseManagment(); 

    upload(req, res, function (err) {
       if (err instanceof multer.MulterError) {
         // A Multer error occurred when uploading.
       } else if (err) {
         // An unknown error occurred when uploading.
       } 
   
       var file = req.files;  
       console.log(file);
       if(file.length <= 0){
          res.send({
            code:400,
            data:'No File Found',
            success:false
          });
       }

       console.log('================================='); 
       console.log(file);
       console.log(JSON.parse(req.body.info)); 
       console.log('=================================');

       let mainFile = file;
       let files = JSON.parse(req.body.info); 
       let folder = 'images';
       let fileType = 'png'; 
       let path =`./${folder}/${files.userid}.${fileType}`;

       console.log(path); 
       console.log(mainFile); 

         if(mainFile.length > 0) 
           fs.writeFile(path, Buffer.from(mainFile[0].buffer), function(err,fds){
               if (err) throw err 
                console.log('========');
                console.log(err);
                console.log(`${files.userid}.${fileType}`);

               console.log('File saved.');
               console.log(__dirname); 
              let im = new ImageManagement();
                  im.updateUsrImg(con,res,{FOODNAME:files.FOODNAME,FOODNAMEFULLNAME: files.FOODNAMEFULLNAME, FOODIMG: path}); 
           });

      });
   });
}

