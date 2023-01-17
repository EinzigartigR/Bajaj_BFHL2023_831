var express = require('express');
var controller = require('../controller/List/list.controller');
var router = express.Router();
var authCheck = require('../middlewares/authjwt');

router.get('/', function (req, res) { 
    res.send('List Works');
 });

router.post('/setItems', [authCheck.CheckToken],controller.setItems);

router.get('/getListItems', [authCheck.CheckToken],controller.getListItems);

router.post('/deleteItem', [authCheck.CheckToken],controller.deleteItem);

router.post('/updateStatus', [authCheck.CheckToken],controller.updateStatus);

router.post('/updatePriority', [authCheck.CheckToken],controller.updatePriority);

router.post('/updateDeadline', [authCheck.CheckToken],controller.updateDeadline);

module.exports = router;