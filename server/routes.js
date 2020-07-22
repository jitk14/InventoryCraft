let express = require('express')
let router = express.Router();
let generateData = require('./dataGenerator');
let path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

router.get('/inventory', (req, res) => {
    res.json(generateData());
})

router.post('/update', (req, res) => {
    setTimeout(()=>{
        res.json({success: true});
    }, 1500)

})

module.exports = router;