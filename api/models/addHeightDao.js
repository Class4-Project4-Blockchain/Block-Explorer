const getConn = require("../utils/db");

exports.addHeight = (height, blockhash) => {
  return new Promise((resolve, reject) => {
    getConn((conn) => {
      console.log(height, ', ', blockhash);
      try {
        let sQuery = `INSERT INTO getblockhash (height, blockhash) VALUES ('${height}', '${blockhash}');`;
        conn.query(sQuery, (err, result, fields) => {
          resolve(result);
        });
        conn.release();
      } catch (err) {
        console.error(err);
      }
    });
  });
};
