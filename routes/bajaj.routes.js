var express = require('express');
var controller = require('../controller/user.controller');
var router = express.Router();
var authCheck = require('../middlewares/authjwt');

router.get('/', function (req, res) { 
    res.send('List Works');
 });

router.post('/bfhl',controller.add_data);

router.get('/bfhl',controller.get_data);

module.exports = router;