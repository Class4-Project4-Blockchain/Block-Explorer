const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mainPage = require('./routes');
const getBlockData = require('./routes/getblockdata');
const getBlockCount = require('./routes/getblockcount');
const getBlockHash = require('./routes/getblockhash');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', mainPage);
app.use('/getblockdata', getBlockData);
app.use('/getblockcount', getBlockCount);
app.use('/getblockhash', getBlockHash);

const host = 'localhost';
const port = 3000;


app.listen(port, () => {console.log(`Server is running at http://${host}:${port}`)});