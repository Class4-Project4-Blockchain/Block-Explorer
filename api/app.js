const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mainPage = require('./routes');
const getBlockCount = require('./routes/getblockcount');
const getBlockHash = require('./routes/getblockhash');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/views'));

app.use('/', mainPage);
app.use('/getblockcount', getBlockCount);
app.use('/getblockhash', getBlockHash);

require('dotenv').config({ path: __dirname + './utils/.env' });
const host = process.env.SV_HOST;
const port = process.env.SV_PORT;


app.listen(port, host, () => {console.log(`Server is running at http://${host}:${port}`)});