

let logging =  require("../logs/log.js");
let log = new logging();
var time = new Date();
var mysql = require('mysql');

class DatabaseManagement{
	
	constructor(){
        const HOSTNAME = process.env.HOSTNAME;
        const PASSWORD = process.env.SQL_PASSWORD;
        const USER = process.env.SQL_USER;
        const DATABASE = process.env.SQL_DATABASE; 
        
        this.con = mysql.createPool({
            connectionLimit:10,
            host:HOSTNAME,//'162.241.239.105',
            user:USER,//'servink3_datekos',
            password:PASSWORD,//'&MO{@]f6926+',
            database:DATABASE,//'servink3_dategame'
        });
        this.pool = this.con;
    }

	async query(){
        var sql_args = [];
        var args = [];
        for(var i=0; i< arguments.length; i++){
            args.push(arguments[i]);
        }
        var callback = args[args.length-1]; //last arg is callback
        await this.pool.getConnection(function(err, connection) {
        
        if(err) {
                console.log(err);
                return callback(err);
        }

        if(args.length > 2){
                sql_args = args[1];
        }

        connection.query(args[0], sql_args, function(err, results) {
          connection.release(); // always put connection back in pool after last query
          if(err){
                    console.log(err);
                    return callback(err);
                }
          callback(null, results);
        });
      });
     
	}		
}


module.exports = DatabaseManagement;