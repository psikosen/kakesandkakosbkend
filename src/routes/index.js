const request_routes = require('./req_routes'); 
let path = require('path');


module.exports = function (app,db) {
    request_routes(app,db);
};
