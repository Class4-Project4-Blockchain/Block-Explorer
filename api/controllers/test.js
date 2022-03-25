var request = require("request");
// const dotenv = require("dotenv");
// dotenv.config();


/*              conf 계정정보                */
const USER = "whkwon"; //process.env.RPC_USER;
const PASS = "1234"; //process.env.RPC_PASSWORD;


const ACCOUNT = "whkwon";
const ID_STRING = "bono_litecoin";
const headers = { "content-type": "text/plain;" };


function getBlockCountChk(cli, params){
  var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":${cli},"params":[${params}]}`;
  var options = {
    url: `http://${USER}:${PASS}@${targetIP}:${PORT}/`,
    method: "POST",
    headers: headers,
    body: dataString
  };

  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
    //   res.send(data); // router요청예시
       console.log(data); //결과 콘솔에 출력
    }
    else if(error) console.error(error);
  };
  request(options, callback);
  
};



/* 트리거 : 실행테스트 */ 
const PORT = 9554; //59330; //구름통신시
// const targetIP = "54.180.195.102"; //구름
const targetIP = "3.138.191.173"; // 태수aws


let getCLI = "getconnectioncount"; //getblockhash 테스트용. 향후 주석처리
let params;// = "1000"; //테스트용. 향후 주석처리
 

getBlockCountChk( getCLI, params );



