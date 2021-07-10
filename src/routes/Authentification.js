var logging =  require("./logs/log.js");
var log = new logging();

class Authentication{
   

     ADMINLOGIN(req,res,con,bcrypt){ 
      let json = req.body;
   	  let IADMINEMAILNAME = json.IADMINEMAILNAME;
      let IPASSWORD = json.UPASSWORD;
      let rtnMessage = '';
      let query  = `call ADMINSLOGIN('${IADMINEMAILNAME.trim()}')`;
         
       con.query(query, function (errv, result) {
	        if (errv){
	          rtnMessage = errv;
	          log.logData(new Date(),"admin","",rtnMessage,"/\ admin");

	          res.send({
	            code:400,
	            success:false,
	            message:rtnMessage
	         });
	        }else{
          console.log('checking results');
         if(result[0].length > 0 ){ 
            let pass =  IPASSWORD.trim();
            let pass2 = result[0][0].UPASSWORD.trim();

            const match =  bcrypt.compareSync(pass, pass2,(err)=>{
                if(err) { 
	        	rtnMessage = 'Admin login error.';
	            console.log('-==========-'); 
		          res.send({
		            code:400,
		            success:false,
		            message:rtnMessage
		         });
                }
            });

                if(match) {
                    	rtnMessage = 'Admin login successful.';
			            console.log('-==========-'); 
				          res.send({
				            code:200,
				            success:false,
				            message: rtnMessage
				         });
                 }else{
                    rtnMessage = 'Password Did not match';
                    log.adminlogData(new Date(),"signin","",rtnMessage,"/\ userSignIn");

                    res.send({
                              code:400,
                              success:false,
                              message:rtnMessage
                      });
                  }
        }else{
            rtnMessage = 'Admin not found';

            res.send({
                code:301,
                success:rtnMessage
            });
        }


	        }
    });
   }

   GETALLCUSTOMER(req,res,con){
      let json = req.body;  
      let query  = `call GETALLCUSTOMER()`; 
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


module.exports = Authentication;