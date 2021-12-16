const router = require('express').Router()
const ProductController = require('../controllers/productController')


router.get('/:id/detail', ProductController.productDetails)


module.exports = router