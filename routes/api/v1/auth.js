
const router = require('express').Router();
// const { application } = require('express');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const User = require('../../../modals/User')

const authController = require('../../../controllere/api/v1/auth_controller');
const {register, login }=authController
//REGISTER USER
router.post('/register',authController.register )

//LOGIN WITH REGISTER USER
router.post('/login', authController.login)

module.exports = router;