const getConn = require("../utils/db");

exports.addBlock = (height, blockhash, merkleroot, time, nonce, previousblockhash, nextblockhash) => {
  return new Promise((resolve, reject) => {
    getConn((conn) => {
      try {
        let sQuery = `INSERT INTO getblock 
                    (height, blockhash, merkleroot, blocktime, nonce, previousblockhash, nextblockhash )
                    VALUES ('${height}', '${blockhash}', '${merkleroot}', '${time}', '${nonce}', '${previousblockhash}', '${nextblockhash}');`;
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

exports.delBlock = (height) => {
  return new Promise((resolve, reject) => {
    getConn((conn) => {
      try {
        let sQuery = `DELETE FROM getblockhash WHERE height='${height}';`;
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