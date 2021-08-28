//var logging =  require(".././logs/log.js"); 
//var log = new logging();

class EventManager{ 

   GETEVENT(req,res,con){
      let json = req.body;
      let IEVENT_ID = json.EVENT_ID;
      let query  = `call GETEVENT('${IEVENT_ID}')`;
          mysqlCall(con,res, 'GETEVENT', query, 'No event with that id exists', true);
   }

   UPDATEEVENT(req, res, con){
    let json = req.body;
    let type = json.TYPE;
    let INPUTVAL = json.INPUTVAL;
    let CUSTOMERID = json.CUSTOMERID;
    let PROCEDURENAME = json.PROCEDURENAME;

    switch(type){
        case 'EVENT_DATE':
              PROCEDURENAME = 'CHANGEEVENT_DATE';
        break;
        case 'EVENT_CONTACTNUMBER':
              PROCEDURENAME = 'CHANGEEVENT_CONTACTNUMBER';
        break;
        case 'EVENT_ADDRESS':
              PROCEDURENAME = 'CHANGEEVENT_ADDRESS';
        break;
        case 'EVENT_TIME':
              PROCEDURENAME = 'CHANGEEVENT_TIME';
    }

    let query  = `call ${PROCEDURENAME}('${INPUTVAL}','${CUSTOMERID}')`;
    console.log(query);
        mysqlCall(con,res, 'UPDATECUSTOMER', query, 'No customer with that id exists', false);
   }

   CREATEKAKESEVENT(req,res,con){   
      let json = req.body;
      let EVENT_ID = json.EVENT_ID;
      let EVENT_ORDERNUMBER = json.EVENT_ORDERNUMBER;
      let EVENT_ADDRESS = json.EVENT_ADDRESS; 
      let EVENT_CONTACTNUMBER = json.EVENT_CONTACTNUMBER;
      let EVENT_DATE = json.EVENT_DATE;
      let EVENT_TIME = json.EVENT_TIME;
 

      let query  = `call CREATEKAKESEVENT('${EVENT_ID}',
                                          '${EVENT_ORDERNUMBER.trim()}',
                                          '${EVENT_ADDRESS.trim()}',
                                          '${EVENT_CONTACTNUMBER.trim()}',
                                          '${EVENT_DATE}',
                                          '${EVENT_TIME.trim()}')`;
          mysqlCall(con, res, 'CREATEKAKESEVENT',query, 'CREATED', true);
   }

   GETALLEVENTS(req,res,con){ 
      let query  = `call GETALLEVENTS()`; 
          mysqlCall(con,res,'GETALLEVENTS',query, 'Fetching all events', false); 
   }

   DELETEEVENT(req,res,con){ 
      let json = req.body; 
      let IEVENT_ID = json.EVENT_ID; 
      let query  = `call DELETEEVENT('${IEVENT_ID}')`; 
          mysqlCall(con,res,'DELETEEVENT',query, 'DELETE', false); 
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
          if(results1.length > 0  || results1.affectedRows > 0){
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
                    success:true,
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