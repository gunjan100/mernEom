const express = require('express')
const router = express.Router()
const {requireSignIn} = require('../middlewares/authMiddleware')
const adminMiddlewares = require('../middlewares/adminMiddlewares')
const productController = require('../controller/product-controller')

router.route('/addProduct').post(requireSignIn, adminMiddlewares, productController.addProduct )
router.route('/getProduct').get( productController.getAllProduct )
router.route('/updateProduct/:id').patch( requireSignIn, adminMiddlewares,productController.upadteProduct)
router.route('/singleProduct/:id').get( requireSignIn, adminMiddlewares,productController.singleProduct)
router.route('/deleteProduct/:id').delete( requireSignIn, adminMiddlewares,productController.deleteProduct)
module.exports=router;