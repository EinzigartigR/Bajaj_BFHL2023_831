var express = require('express');
var controller = require('../controller/index.controller');
const verifySignUp = require('../middlewares/verifySignUp');
var router = express.Router();
router.get('/', function (req, res) { 
    res.send('Hello World');
 });

router.post('/signUp', [verifySignUp.checkDuplicateUsernameOrEmail], controller.signUp); //first goes to middleware and verifies, then to the controller

router.post('/signIn', controller.signIn);

router.get('/getAllUsers', controller.getAllUsers);

router.post('/setItems', controller.setItems);

router.get('/getListItems', controller.getListItems);

module.exports = router;

