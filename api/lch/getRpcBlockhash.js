var request = require("request");
// const dotenv = require("dotenv");
// dotenv.config();

module.exports = function getblockhash(index_block){
    /*              conf 계정정보                */
    const USER = "whkwon"; //process.env.RPC_USER;
    const PASS = "1234"; //process.env.RPC_PASSWORD;
    
    /* 통신 기본값 */
    const ACCOUNT = "whkwon";
    const ID_STRING = "bono_litecoin";
    const headers = { "content-type": "text/plain;" };
    const PORT = 53753; //구름통신시 9554의 포트포워딩
    const targetIP = "54.180.195.102"; //구름
    // const targetIP = "3.138.191.173"; // 태수aws
    var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getblockhash","params":[${index_block}]}`;
    var options = {
        url: `http://${USER}:${PASS}@${targetIP}:${PORT}/`,
        method: "POST",
        headers: headers,
        body: dataString
    };

  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      console.log(data); //결과 콘솔에 출력
      
    }
    else if(error) console.error(error);
  };
  request(options, callback);
  
};

//getBlockCountChk();













// curl --user whkwon:1234 --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblockcount", "params": []}' -H 'content-type: text/plain;' http://54.180.195.102:59330/
// curl --user whkwon:1234 --data-binary '{"jsonrpc": "1.0", "method": "getblockcount", "params": []}' -H 'content-type: text/plain;' http://54.180.195.102:59330/
// curl --user whkwon:1234 --data-binary '{"jsonrpc": "1.0", "method":"getblockcount", "params": [] }' -H 'content-type: text/plain;' http://3.138.191.173:9554/ 