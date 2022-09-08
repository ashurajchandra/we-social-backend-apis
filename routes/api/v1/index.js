const router = require('express').Router();

const usersRoute = require('./users');
const authRoute = require('./auth');
const postRoute = require('./post')

router.use('/user',usersRoute);
router.use('/auth',authRoute);
router.use('/post',postRoute);


module.exports = router;