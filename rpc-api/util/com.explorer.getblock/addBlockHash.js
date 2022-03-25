const getConn = require("./dbconn");

module.exports = function addBlockHash(height, blockhash, merkleroot, blocktime, nonce, previousblockhash, nextblockhash ) {
    return new Promise((resolve, reject) => {
        getConn((conn) => {
            try {
                let sQuery = `INSERT INTO getblock 
                    (height, blockhash, merkleroot, blocktime, nonce, previousblockhash, nextblockhash )
                    VALUES (${height}, ${blockhash}, ${merkleroot}, ${blocktime}, ${nonce}, ${previousblockhash},${nextblockhash});`; 
                conn.query(sQuery, (err, result, fields) => { resolve(result);  });
                conn.release();
            } catch (err) { console.err(err); }
        })
    })
}