const getConn = require("../utils/db");
// const bcrypt = require("bcryptjs");
//SELECT MAX(height) FROM getblock;
exportts.getBlcokCheck = () => {
  return new Promise((resolve, reject) => {
    getConn((conn) => {
      try {
        let sQuery = `SELECT MAX(height) FROM getblock`;
        conn.query(sQuery, (err, result) => {
          resolve(result);
        });
        conn.release();
      } catch (err) {
        console.err(err);
      }
    });
  });
};
