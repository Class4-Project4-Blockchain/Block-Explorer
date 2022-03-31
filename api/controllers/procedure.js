const readHeightDao = require("../models/readHeightDao");
const readBlockDao = require("../models/readBlockDao");
const addHeightDao = require("../models/addHeightDao");
const addBlockDao = require("../models/addBlockDao");
const request = require("request");
require("dotenv").config({ path: __dirname + "./utils/.env" });

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
      res.render('index');
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
      let options = rpcOptions('getblockcount', "");

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
    getblockhash: async (req, res) => {
      let box = req.body.searchBox;
      let search = req.body.search
      let blockinfo = {}
      let result;
      
      if (box == "height") {
        if (search.length == 0) {
          return res.send(
            `<script>
              alert('height값을 입력 해주세요');
              location.href='/';
            </script>`
          );
        }

        if (isNaN(search) == true) {
          return res.send(
            `<script>
            alert('올바른 height값(숫자)을 입력 해주세요');
            location.href='/';
          </script>`
          );
        }
        result = await readBlockDao.readBlock(box, search);
        if(result[0] == undefined) return res.render('getblockerror');
      }
      
      else if (box == "blockhash") {
        if (search.length < 64) {
          return res.send(
            `<script>
              alert('올바른 blockhash 형태가 아닙니다');
              location.href='/';
            </script>`
          );
        }
        result = await readBlockDao.readBlock(box, search);
        if (result[0] == undefined) return res.render('getblockerror');
      }
      
      else res.render('getblockerror');
      
      blockinfo = {
        height: result[0].height,
        blockhash: result[0].blockhash,
        merkleroot: result[0].merkleroot,
        blocktime: result[0].blocktime,
        nonce: result[0].nonce,
        previousblockhash: result[0].previousblockhash,
        nextblockhash: result[0].nextblockhash
      };

      function Unix_timestamp(t){
        var date = new Date(t*1000);
        var year = date.getFullYear();
        var month = "0" + (date.getMonth()+1);
        var day = "0" + date.getDate();
        var hour = "0" + date.getHours();
        var minute = "0" + date.getMinutes();
        var second = "0" + date.getSeconds();
        return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
      }
    
      const timeTransfer = Unix_timestamp(blockinfo.blocktime);
      res.render('getblockhash', {blockinfo, timeTransfer});
    },
  },
};

// AWS : curl --user whkwon:1234 --data-binary '{"jsonrpc": "1.0", "method":"getblockcount", "params": [] }' -H 'content-type: text/plain;' http://3.35.141.239:9990/