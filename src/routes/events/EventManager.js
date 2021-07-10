//var logging =  require(".././logs/log.js"); 
//var log = new logging();

class EventManager{ 

   GETEVENT(req,res,con){
      let json = req.body;
      let IEVENT_ID = json.EVENT_ID;
      let query  = `call GETEVENT('${IEVENT_ID.trim()}')`;
          mysqlCall(con,res, 'GETEVENT', query, 'No event with that id exists', true);
   }

   CREATEKAKESEVENT(req,res,con){   
      let json = req.body;
      let EVENT_ID = json.EVENT_ID;
      let EVENT_ORDERNUMBER = json.EVENT_ORDERNUMBER;
      let EVENT_ADDRESS = json.EVENT_ADDRESS; 
      let EVENT_CONTACTNUMBER = json.EVENT_CONTACTNUMBER;
      let EVENT_DATE = json.EVENT_DATE;
      let EVENT_TIME = json.EVENT_TIME;
 

      let query  = `call CREATEKAKESEVENT('${json.EVENT_ID.trim()}',
                                          '${json.EVENT_ORDERNUMBER.trim()}',
                                          '${json.EVENT_ADDRESS.trim()}',
                                          '${json.EVENT_CONTACTNUMBER.trim()}',
                                          '${json.EVENT_DATE.trim()}',
                                          '${json.EVENT_TIME.trim()}')`;
          mysqlCall(con, res, 'CREATEKAKESEVENT',query, 'Event Already Exists', true);
   }

   GETALLEVENTS(req,res,con){
      let json = req.body;  
      let query  = `call GETALLEVENTS()`; 
          mysqlCall(con,res,'GETALLEVENTS',query, 'User does not exist', false); 
   }

   DELETEEVENT(req,res,con){ 
      let json = req.body; 
      let IEVENT_ID = json.EVENT_ID; 
      let query  = `call DELETEEVENT('${json.IEVENT_ID.trim()}')`; 
          mysqlCall(con,res,'DELETEEVENT',query, 'User does not exist', false); 
   }
}

function mysqlCall(con,res,type,query, errorMsg, getDataBack){
   let rtnMessage = '';
   con.query(query, function (errv, results1) {
            if (errv){
                rtnMessage = errv;
                //log.logData(new Date(),type,"", rtnMessage, type);
                res.send({
                  code:400,
                  success:false,
                  message:rtnMessage
                });  
            }else{
                console.log('<==============>');
                console.log(results1);  
          if(results1.length > 0){
            if(getDataBack){
                res.send({
                          code:200,
                          success:false,
                          data:results1,
                          message: rtnMessage
                });
            }else{
                res.send({
                    code:200,
                    success:false,
                    message: rtnMessage
                });
            }
  
          }else{
              res.send({
                    code:301,
                    success:false,
                    message:errorMsg
              });
          }
              
       }
    });
}

module.exports = EventManager;