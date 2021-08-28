var logging =  require("./logs/log.js");
var log = new logging();

class ImageManagement{
    
    insertImg( imginfo,con){ 
      let query  = `call CREATEFOODITEM(
            ${imginfo.FOODNAMEFULLNAME},
            ${imginfo.FOODDESCRIPTION},
            ${imginfo.FOODIMG},
          })`;  
          mysqlCall(con,'FOODITEMS', query); 
   }

   updateUsrImg( imginfo,con){ 
    let query  = `call CHANGEFOODITEMSIMG(
                          ${imginfo.FOODNAMEFULLNAME},
                          ${imginfo.FOODDESCRIPTION},
                          ${imginfo.FOODIMG},
                        })`; 
    
        mysqlCall(con,'GETALLCUSTOMER', query); 
 }
}


function mysqlCall(con, type,query){
   let rtnMessage = '';
   con.query(query, function (errv, results1) {
            if (errv){
                rtnMessage = errv;
                log.logData(new Date(),type,"", rtnMessage, type);
                res.send({
                  code:400,
                  success:false,
                  message:rtnMessage
                });  
            }else{
                console.log('<==============>');
                console.log(results1);  
          if(results1.length > 0){
            res.send({
                    code:200,
                    success:false,
                    message: rtnMessage
            });
          }else{
              res.send({
                    code:301,
                    success:false,
                    message:rtnMessage
              });
          }
              
       }
    });
}


module.exports = ImageManagement;