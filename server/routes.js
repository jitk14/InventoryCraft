let express = require('express')
let router = express.Router();
let generateData = require('./dataGenerator');

router.get('/inventory', (req, res) => {
    res.json(generateData());
})

module.exports = router;