const getConn = require("../utils/db");

exports.blockData = () => {
  return new Promise((resolve, reject) => {
    getConn((conn) => {
      try {
        let sQuery = `SELECT MAX(height) FROM getblock`;
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
