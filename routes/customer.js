const router = require('express').Router()
const CustomerController = require('../controllers/customerController')

router.get('/create', CustomerController.createAccount)
router.post('/create', CustomerController.createAccountPost)

router.get('/login', CustomerController.loginAccount)
router.post('/login', CustomerController.createAccountPost)

router.get('/:id/profile', CustomerController.profile)
router.get('/:id/buy', CustomerController.addToCart)
router.post('/:id/buy', CustomerController.checkoutCart)


module.exports = router