const express = require('express');
const cors = require('cors');
let path = require('path');

const app = express();

app.use(cors());

app.use('/static',express.static(path.join(__dirname, '/client/build/static')));

const routers = require('./server/routes');

app.use('/', routers);

app.listen(8000, () => {
    console.log('Listening on localhost:8000')
})

