const compareArgs = require('./procedure');

const callback = () => {
    let comp_1 = compareArgs.getBlockData.blockData();
    let comp_2 = compareArgs.getBlockData.daemon();
    console.log("이거냐? 1", comp_1);
    console.log("이거냐? 2", comp_2);
};

const autoInsert = setInterval(callback, 5000);


module.exports = autoInsert;