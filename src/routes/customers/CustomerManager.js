//var logging =  require(".././logs/log.js"); 
//var log = new logging();

class CustomerManager{ 

   GETCUSTOMER(req,res,con){
      let json = req.body;
      let CUSTOMERID = json.CUSTOMERID;
      let query  = `call GETCUSTOMER('${CUSTOMERID.trim()}')`;
          mysqlCall(con,res, 'GETCUSTOMER', query, 'No customer with that id exists', true);
   }

   CREATECUSTOMER(req,res,con){   
      let json = req.body;
      let CUSTOMERFULLNAME = json.CUSTOMERFULLNAME;
      let CUSTOMERPHONENUMBER = json.CUSTOMERPHONENUMBER;
      let CUSTOMEREMAILADDESS = json.CUSTOMEREMAILADDESS;

      let query  = `call CREATECUSTOMER('${json.CUSTOMERFULLNAME.trim()}',
                                        '${json.CUSTOMERPHONENUMBER.trim()}',
                                        '${json.CUSTOMEREMAILADDESS.trim()}')`;
          mysqlCall(con, res, 'CREATECUSTOMER',query, 'User Already Exists', false);
   }

   CHECKIFUSEREXISTS(req,res,con){
      let json = req.body; 
      let CUSTOMERFULLNAME = json.CUSTOMERFULLNAME;
      let CUSTOMERPHONENUMBER = json.CUSTOMERPHONENUMBER;
      let query  = `call CHECKIFUSEREXISTS('${json.CUSTOMERFULLNAME.trim()}',
                                           '${json.CUSTOMERPHONENUMBER.trim()}')`; 
          mysqlCall(con,res,'CHECKIFUSEREXISTS',query, 'User does not exist', false); 
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

module.exports = CustomerManager;