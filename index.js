const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors())

const routers = require('./server/routes');

app.use('/', routers);

app.listen(8000, () => {
    console.log('Listening on localhost:8000')
})

