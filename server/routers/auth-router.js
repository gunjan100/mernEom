const express = require('express')
const router = express.Router()
const authController = require('../controller/auth-controller')
const {requireSignIn, isadmin} = require('../middlewares/authMiddleware')




router.route('/create').post(authController.registerUser)
router.route('/login').post(authController.logINuser)
router.route('/authenuser').get(requireSignIn, authController.user)


module.exports = router