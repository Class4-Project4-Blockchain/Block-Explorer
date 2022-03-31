const readHeightDao = require("../models/readHeightDao");
const addHeightDao = require("../models/addHeightDao");
const addBlockDao = require("../models/addBlockDao");
const request = require("request");
require("dotenv").config({ path: __dirname + "/.env" });

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASS;
const PORT = process.env.RPC_PORT;
const URL = process.env.RPC_URL;
const ID = "Bonocoin";
const headers = { "content-type": "text/plain;" };

const rpcOptions = (method, params) => {
  let dataString = `{"jsonrpc":"1.0","id":"${ID}","method":"${method}","params":[${params}]}`
  let options = {
    url: `http://${USER}:${PASS}@${URL}:${PORT}/`,
    method: "POST",
    headers: headers,
    body: dataString,
  };
  return options;
};

module.exports = {
  getBlockDao: {
    blockcheck: (req, res) => {
      (() => {
        let options = rpcOptions('getblockcount', '');

        callback = (error, response, body) => {
          if (!error && response.statusCode == 200) {
            let blockcountDm = JSON.parse(body);
            console.log("데몬 값", blockcountDm.result);

            let getblockcount;

            (async () => {
              let dao = ([] = await readHeightDao.readHeight());
              getblockcount = dao[0]["MAX(height)"]; // ★ 결정타
              console.log("최근 db에 저장된 값", getblockcount);

              // addHeightDao
              if(blockcountDm.result == getblockcount) {
                return console.log("There is no data updated");
              } else {
                // let i = getblockcount + 1; // ★ 왜 이렇게하면 안되지????????

                for (let i = getblockcount; i <= blockcountDm.result; i++) {
                  if(i == getblockcount) {
                    (async () => {
                      await addBlockDao.delBlock(i);
                    })();
                  }
                  let options_2 = rpcOptions('getblockhash', i);
                  callback_2 = (error, response, body) => {
                    if(!error && response.statusCode == 200) {
                      let obj = JSON.parse(body);
                      let result = obj.result;
                      (async () => {
                        await addHeightDao.addHeight(i, result);
                      })();
                      
                      // addBlockDao
                      let options_3 = rpcOptions("getblock", `"${result}"`);
                      callback_3 = (error, response, body) => {
                        if(!error && response.statusCode == 200) {
                          let obj = JSON.parse(body);
                          let blockInfo = {
                            merkleroot: obj.result.merkleroot,
                            time: obj.result.time,
                            nonce: obj.result.nonce,
                            previousblockhash: obj.result.previousblockhash,
                            nextblockhash: obj.result.nextblockhash
                          }
                          ;(async () => { // Error: js가 인클루드된 상황에서 처음 열리는 클로저에 문제가 있다면 첫라인에 " ; " 를 사용하면 된다
                            await addBlockDao.addBlock(i, result, blockInfo.merkleroot, blockInfo.time, blockInfo.nonce, blockInfo.previousblockhash, blockInfo.nextblockhash)
                          })();
                        } else { console.error("addBlockDao's Error", error) }
                      };

                      request(options_3, callback_3);

                    } else { console.error("addHeightDao's Error", error) };
                  };

                  request(options_2, callback_2);
                }
              }
            })();

          } else {
            console.error("getblock's Error => ", error);
          }
        };

        request(options, callback);
      })(); // ★ 즉시 실행 함수 (Immediately-invoked function expression)
    },
  },

  getBlockCount: {
    getblockcount: (req, res) => {
      let dataString = `{"jsonrpc":"1.0","id":"${ID}","method":"getblockcount","params":[]}`;
      let options = {
        url: `http://${USER}:${PASS}@${URL}:${PORT}/`,
        method: "POST",
        headers: headers,
        body: dataString,
      };

      callback = (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const data = JSON.parse(body);
          res.render("getblockcount", {
            getblockcount: data.result,
          });
        } else {
          console.error("getblockcount's Error => ", error);
        }
      };

      request(options, callback);
    },
  },

  getBlockHash: {
    getblockhash: (req, res) => {
      let dataString = `{"jsonrpc":"1.0","id":"${ID}","method":"getblockhash","params":[${req.body.search}]}`;
      let options = {
        url: `http://${USER}:${PASS}@${URL}:${PORT}/`,
        method: "POST",
        headers: headers,
        body: dataString,
      };

      callback = (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const data = JSON.parse(body);
          console.log(data);
          res.render("getblockhash_result", {
            blockinfo: data.result,
          });
        } else {
          console.error("getblockhash's Error => ", error);
        }
      };

      request(options, callback);
    },
  },
};

// AWS : curl --user whkwon:1234 --data-binary '{"jsonrpc": "1.0", "method":"getblockcount", "params": [] }' -H 'content-type: text/plain;' http://3.35.141.239:9990/