const DAO = require("../models/models");
var request = require("request");
require("dotenv").config({ path: __dirname + "/.env" });

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASS;
const PORT = process.env.RPC_PORT;
const URL = process.env.RPC_URL;
const ACCOUNT = "whkwon";
const ID = "bono_litecoin";
const headers = { "content-type": "text/plain;" };

module.exports = {
  Api: {
    getblock: async (req, res) => {
      let result = await DAO.getRead();
      console.log(result);
      res.render("index");
    },

    getblockcount: (req, res) => {
      var dataString = `{"jsonrpc":"1.0","id":"${ID}","method":"getblockcount","params":[]}`;
      var options = {
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

    getblockhash: (req, res) => {
      var dataString = `{"jsonrpc":"1.0","id":"${ID}","method":"getblockhash","params":[${req.body.search}]}`;
      var options = {
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
            blockinfo: data.result
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
