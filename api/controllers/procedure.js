const readHeightDao = require("../models/readHeightDao");
const addHeightDao = require("../models/addHeightDao");
const request = require("request");
require("dotenv").config({ path: __dirname + "/.env" });

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASS;
const PORT = process.env.RPC_PORT;
const URL = process.env.RPC_URL;
const ID = "Bonocoin";
const headers = { "content-type": "text/plain;" };

module.exports = {
  getBlockDao: {
    blockcheck: (req, res) => {
      (() => {
        let dataString = `{"jsonrpc":"1.0","id":"${ID}","method":"getblockcount","params":[]}`;
        let options = {
          url: `http://${USER}:${PASS}@${URL}:${PORT}/`,
          method: "POST",
          headers: headers,
          body: dataString,
        };

        callback = (error, response, body) => {
          if (!error && response.statusCode == 200) {
            let blockcountDm = JSON.parse(body);
            console.log("데몬 값", blockcountDm.result);

            let getblockcount;

            (async () => {
              let dao = ([] = await readHeightDao.readHeight());
              getblockcount = dao[0]["MAX(height)"]; // ★ 결정타
              console.log("최근 db에 저장된 값", getblockcount);

              if (blockcountDm.result == getblockcount) {
                return console.log("최신 데이터입니다");
              } else {
                let i = getblockcount + 1; // 초기값 i = 0

                for (i; i <= blockcountDm.result; i++) {
                  (() => {
                    let dataString = `{"jsonrpc":"1.0","id":"${ID}","method":"getblockhash","params":[${i}]}`;
                    let options_2 = {
                      url: `http://${USER}:${PASS}@${URL}:${PORT}/`,
                      method: "POST",
                      headers: headers,
                      body: dataString,
                    };
                    
                    callback_2 = (error, response, body) => {
                      if (!error && response.statusCode == 200) {
                        let result = JSON.parse(body);
                        (async () => {
                          await addHeightDao.addHeight(i, result.result);
                        })();
                      } else { console.error("addHeightDao's Error", error) };
                    };

                    request(options_2, callback_2);
                  })();
  
                }
                i = 0;
                console.log("이거냐????????", i);
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
// 구름: curl --user whkwon:1234 --data-binary '{"jsonrpc": "1.0", "method":"getblockcount", "params": [] }' -H 'content-type: text/plain;' http://3.35.49.169:52677/
