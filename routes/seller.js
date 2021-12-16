const router = require('express').Router()
const SellerController = require('../controllers/sellerController')


router.get('/create', SellerController.createAccount)
router.post('/create', SellerController.createAccountPost)
router.get('/login', SellerController.loginAccount)
router.post('/login', SellerController.loginAccountPost)

router.get('/:id/', SellerController.profile)
router.get('/:id/add', SellerController.addProduct)
router.post('/:id/add', SellerController.addProductPost)




module.exports = router