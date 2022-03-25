const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use('/', router);

const host = 'localhost';
const port = 3000;


app.listen(port, () => {console.log(`Server is running at http://${host}:${port}`)});