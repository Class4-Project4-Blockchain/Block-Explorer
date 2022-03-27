const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routes');

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


app.use('/', router);

const host = 'localhost';
const port = 3000;


app.listen(port, () => {console.log(`Server is running at http://${host}:${port}`)});