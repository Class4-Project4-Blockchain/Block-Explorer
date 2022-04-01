const getConn = require("../utils/db");

exports.readHeight = () => {
  return new Promise((resolve, reject) => {
    getConn((conn) => {
      try {
        let sQuery = `SELECT MAX(height) FROM getblockhash`;
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
