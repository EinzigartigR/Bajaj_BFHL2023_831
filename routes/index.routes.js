var express = require('express');
var router = express.Router();
var userRouter = require('./user.routes');
var listRouter = require('./list.routes');
router.get('/', function (req, res) { 
    res.send('Hello World');
 });
router.use('/user', userRouter);
router.use('/list', listRouter);
module.exports = router;