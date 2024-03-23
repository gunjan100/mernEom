const express = require('express')
const { requireSignIn } = require('../middlewares/authMiddleware')
const adminMiddlewares = require('../middlewares/adminMiddlewares')
const categoreyController = require('../controller/categorey-controller')

const router = express.Router()



router.route('/create-categorey').post(requireSignIn, adminMiddlewares, categoreyController.createCategorey)
router.route('/getCategorey').get(categoreyController.getAllCate)
router.route('/singleCategorey/:id').get(categoreyController.getSingleCtaegorey)
router.route('/updateCategorey/:id').patch(categoreyController.updateCategorey)
router.route('/deleteCategorey/:id').delete(requireSignIn, adminMiddlewares, categoreyController.deleteCategoreyById)
module.exports= router