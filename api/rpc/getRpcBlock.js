var request = require("request");
require("dotenv").config({ path: __dirname + "/.env" });

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASS;
const PORT = process.env.RPC_PORT;
const URL = process.env.RPC_URL;

const getBlockCount = (req, res) => {
  /* 통신 기본값 */
  const ACCOUNT = "whkwon";
  const ID_STRING = "bono_litecoin";
  const headers = { "content-type": "text/plain;" };
  var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getblockcount","params":[]}`;
  var options = {
    url: `http://${USER}:${PASS}@${URL}:${PORT}/`,
    method: "POST",
    headers: headers,
    body: dataString,
  };

  console.log(USER, PASS, PORT, URL);

  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      console.log("되냐?");
      console.log(data);
    }
    else {
      console.error("에러내용",error);
    }
  };

  request(options, callback);
};

getBlockCount();

module.exports = getBlockCount;

// curl --user whkwon:1234 --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblockcount", "params": []}' -H 'content-type: text/plain;' http://54.180.195.102:53753/
// curl --user whkwon:1234 --data-binary '{"jsonrpc": "1.0", "method": "getblockcount", "params": []}' -H 'content-type: text/plain;' http://54.180.195.102:59330/
// curl --user whkwon:1234 --data-binary '{"jsonrpc": "1.0", "method":"getblockcount", "params": [] }' -H 'content-type: text/plain;' http://3.138.191.173:9554/

// curl --user whkwon:1234 --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblockcount", "params": []}' -H 'content-type: text/plain;' http://3.138.191.173:9554/
// curl --user whkwon:1234 --data-binary '{"jsonrpc": "1.0", "method":"getblockcount", "params": [] }' -H 'content-type: text/plain;' http://3.138.191.173:9990/

// 원현aws curl --user whkwon:1234 --data-binary '{"jsonrpc": "1.0", "method":"getblockcount", "params": [] }' -H 'content-type: text/plain;' http://3.35.141.239:9990/
