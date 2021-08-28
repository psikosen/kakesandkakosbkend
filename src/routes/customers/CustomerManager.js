//var logging =  require(".././logs/log.js"); 
//var log = new logging();

class CustomerManager{ 

   GETCUSTOMER(req,res,con){
      let json = req.body;
      let CUSTOMERID = json.CUSTOMERID;
      let query  = `call GETCUSTOMER('${CUSTOMERID}')`;
          mysqlCall(con,res, 'GETCUSTOMER', query, 'No customer with that id exists', true);
   }
   
   UPDATECUSTOMER(req, res, con){
    let json = req.body;
    let type = json.TYPE;
    let INPUTVAL = json.INPUTVAL;
    let CUSTOMERID = json.CUSTOMERID;
    let PROCEDURENAME = json.PROCEDURENAME;

    switch(type){
        case 'CUSTOMERFULLNAME':
              PROCEDURENAME = 'CHANGECUSTOMERFULLNAME';
        break;
        case 'CUSTOMERPHONENUMBER':
              PROCEDURENAME = 'CHANGECUSTOMERPHONENUMBER';
        break;
        case 'CUSTOMEREMAILADDRESS':
              PROCEDURENAME = 'CHANGECUSTOMEREMAILADDRESS';
        break;
    }

    let query  = `call ${PROCEDURENAME}('${INPUTVAL}','${CUSTOMERID}')`;
    console.log(query);
        mysqlCall(con,res, 'UPDATECUSTOMER', query, 'No customer with that id exists', false);
   }


   DELETECUSTOMER(req,res,con){
    let json = req.body;
    let CUSTOMERID = json.CUSTOMERID;
    let query  = `call DELETECUSTOMER('${CUSTOMERID}')`;
        mysqlCall(con,res, 'DELETECUSTOMER', query, 'No customer with that id exists', true);
   }

   GETALLCUSTOMERS(res,con){ 
        let query  = `call GETALLCUSTOMER()`; 
            mysqlCall(con,res,'GETALLCUSTOMER',query, 'Fetching all customers', true); 
   }

   CREATECUSTOMER(req,res,con){   
      let json = req.body;
      let CUSTOMERFULLNAME = json.CUSTOMERFULLNAME;
      let CUSTOMERPHONENUMBER = json.CUSTOMERPHONENUMBER;
      let CUSTOMEREMAILADDESS = json.CUSTOMEREMAILADDESS;

      let query  = `call CREATECUSTOMER('${CUSTOMERFULLNAME}',
                                        '${CUSTOMERPHONENUMBER}',
                                        '${CUSTOMEREMAILADDESS}')`;
          mysqlCall(con, res, 'CREATECUSTOMER',query, 'User Already Exists', false);
   }

   CHECKIFUSEREXISTS(req,res,con){
      let json = req.body; 
      let CUSTOMERFULLNAME = json.CUSTOMERFULLNAME;
      let CUSTOMERPHONENUMBER = json.CUSTOMERPHONENUMBER;
      let query  = `call CHECKIFUSEREXISTS('${CUSTOMERFULLNAME}',
                                           '${CUSTOMERPHONENUMBER}')`; 
          mysqlCall(con,res,'CHECKIFUSEREXISTS',query, 'User does not exist', false); 
   }
}

function mysqlCall(con,res,type,query, errorMsg, getDataBack){
   let rtnMessage = '';
   
   con.query(query, function (errv, results1) {
            if (errv){
                rtnMessage = errv; 
                res.send({
                  code:400,
                  success:false,
                  message:rtnMessage
                });  
            }else{
                console.log('<==============>');
                console.log(results1);  
          if(results1.length > 0 || results1.affectedRows > 0){
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

module.exports = CustomerManager;