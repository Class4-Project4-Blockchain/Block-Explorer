const mysql = require('mysql');
require('dotenv').config({ path: __dirname + '/.env' });

const dbConf = {
    host: process.env.HOST,
    user: process.env.USERS,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.PORT,
    commitLimit: process.env.COMMITLIMIT
}

const con = mysql.createPool(dbConf);

const getConn = function(callback) {
    con.getConnection((err, connection) => {
        if(err) {console.error(err)}
        console.log("Connection Success");
        
        callback(connection);
    });
};

getConn;

module.exports = getConn;