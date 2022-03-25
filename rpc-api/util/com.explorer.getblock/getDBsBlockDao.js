const getConn = require("../dbconn.js");
const bcrypt = require("bcryptjs");
//SELECT MAX(height) FROM getblock;
module.exports = async function getBlcokCheck () {
        return new Promise((resolve, reject) => {
            getConn((conn) => {
                try {
                    let sQuery = `SELECT MAX(height) FROM getblock`; 
                    conn.query(sQuery, (err, result) => { resolve(result) });
                    conn.release();
                } catch (err) { console.err(err); }
            })
        })
}
    
    