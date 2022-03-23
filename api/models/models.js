const getConn = require('../utils/db');

exports.getRead = () => {
    return new Promise((resolve, reject) => {
        getConn((con) => {
            try {
                let sql = `SELECT * FROM getblock`;
                con.query(sql, (err, result, fields) => {resolve(result)});
                con.release();
            
            } catch (err) {
                console.error(err);
            };
        });
    });
};