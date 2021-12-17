const router = require('express').Router()
const CustomerController = require('../controllers/customerController')

router.get('/create', CustomerController.createAccount)
router.post('/create', CustomerController.createAccountPost)
router.get('/test', CustomerController.findAll)

router.get('/login', CustomerController.loginAccount)
router.post('/login', CustomerController.loginAccountPost)

router.get('/:id/topUp', CustomerController.topUpBalance)
router.get('/:id/topUp', CustomerController.topUpBalancePost)

router.get('/:id/cart', CustomerController.cart)
router.get('/:id/buy', CustomerController.addToCart)
router.post('/:id/cart', CustomerController.checkoutCart)


module.exports = router