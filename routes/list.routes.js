var express = require('express');
var controller = require('../controller/list.controller');
var router = express.Router();
var authCheck = require('../middlewares/authjwt');

router.get('/', function (req, res) { 
    res.send('List Works');
 });

router.post('/setItems', [authCheck.CheckToken],controller.setItems);

router.get('/getListItems', [authCheck.CheckToken],controller.getListItems);

router.post('/deleteItem', [authCheck.CheckToken],controller.deleteItem);

router.post('/updateItem', [authCheck.CheckToken],controller.updateItem);

module.exports = router;