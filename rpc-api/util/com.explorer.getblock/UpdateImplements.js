const DBblock = require("./getDBsBlockDao.js");
const rpcBlock = require("./getRpcBlock.js");
const addBlockHash = require("./addBlockHash.js")
//addBlockHash
// 5분마다 실행하는 whileLoop
// let getNewBlockCount = getblcokcount조회 RPC통신함수
// let getDBcurrentBlockCount = DB에서 블럭카운트 DB select
// if (두 값 같을 경우) 종료(return ;)
// else if (getNewBlcokCount > getDBcurrentBlockCount) { DB저장 } 
// else { return ; }       

setInterval(
    function getCompareValues(){
        let getNewblockCount =  rpcBlock.getBlockCountChk();
         // RPC통신
        let getDBcurrentBlockCount =  DBblock.getBlcokCheck();
        // DB조회 Select

        console.log("신규블럭조회 : " + getNewblockCount, ", DB블럭 조회" + getDBcurrentBlockCount);
        
        if(getNewblockCount == getDBcurrentBlockCount){
            console.log("현재 추가된 정보가 없음.")
            return ;
        }
        else if(getNewblockCount > getDBcurrentBlockCount) { //1882
            addBlockHash.addBlockHash(height, blockhash, merkleroot, blocktime, nonce, previousblockhash, nextblockhash )
            
            // let IntervalBlocks = getNewblockCount - getDBcurrentBlockCount ;
            // console.log("추가된 블럭수 : " + IntervalBlocks);
            /*
            추가된 블럭갯수만큼 조회해서 DB에 저장
            for(let i=0; i< IntervalBlocks; i++){
                let  rpcresult = RPC : getblockhash getDBcurrentBlockCount+1
                DB에 저장하는 함수(rpcresult);
                getDBcurrentBlockCount++;
            }
            */
            return "추가된 블럭 개수는 " + IntervalBlocks + "개 입니다!!";
        }
        else{
            console.log("예외상황. 블럭점검 필요")
            return ;
        }
}, 6000);
	// setInterval( getCompareValues(getNewblockCount, getDBcurrentBlockCount), 360000);


