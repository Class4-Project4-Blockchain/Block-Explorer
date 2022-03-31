const getConn = require("../utils/db");

exports.readBlock = (attr, value) => {
  return new Promise((resolve, reject) => {
    getConn((conn) => {
      try {
        let sQuery = `SELECT * FROM getblock WHERE ${attr}="${value}"`;
        conn.query(sQuery, (err, result) => {
          resolve(result);
        });
        conn.release();
      } catch (err) {
        console.error(err);
      }
    });
  });
};
