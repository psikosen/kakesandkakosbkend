
var fs = require('fs');

class Log{

	constructor(){

	}
	
    logData(time, funcName,statusMessage,err,route){
	  var errorStr = '\n' + '[' + time + '] ' +
	         funcName + ' - ' + statusMessage + 
	         '  [ ' + err + '] '  + route;
	  
	  fs.appendFile('./src/logs/Log.txt', errorStr, err => {
	      if (err) throw err;
	      console.log(err);
	    });
	} 

	 adminLogData(time, funcName,statusMessage,err,route){
	  var errorStr = '\n' + '[' + time + '] ' +
	         funcName + ' - ' + statusMessage + 
	         '  [ ' + err + '] '  + route;
	  
	  fs.appendFile('./src/logs/adminLogData.txt', errorStr, err => {
	      if (err) throw err;
	      console.log(err);
	    });
	} 
	ScheduleJobsLog(time, funcName,statusMessage,err,route){
		var errorStr = '\n' + '|' + time + '| ' +
			   funcName + ' - ' + statusMessage + 
			   '  | ' + err + '| '  + route;
		
		fs.appendFile('./app/logs/ScheduleJobsLog.txt', errorStr, err => {
			if (err) throw err;
			   console.log(err);
		  });
	}
	createLogFile(){


	}
	deleteLogFile(){

	}
	
	writeToLogFile(){

	}


}

module.exports = Log;