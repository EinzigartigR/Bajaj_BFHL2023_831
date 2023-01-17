var express = require('express');
var controller = require('../controller/List/sublist.controller');
var router = express.Router();
var authCheck = require('../middlewares/authjwt');

router.get('/', function (req, res) { 
    res.send('Sublist Works');
 });

router.post('/setSubItems', [authCheck.CheckToken],controller.setSubItems);

router.get('/getSublistItems', [authCheck.CheckToken],controller.getSublistItems);

router.post('/deleteSublistItem', [authCheck.CheckToken],controller.deleteSublistItem);

router.post('/updateSubslistStatus', [authCheck.CheckToken],controller.updateSubslistStatus);

module.exports = router;