const Customer = require('../models/index').Customer
const Product = require('../models/index').Product
const ProductReceipt = require('../models/index').ProductReceipt



class CustomerController {
    static createAccount(req, res) {
        Customer.create()
            .then(data => {
                res.render('createCustomer')
            })
            .catch(err => {
                res.send(err)
            })
    }
    static loginAccount(req, res) {
        Customer.findByPk(id)
            .then(data => {
                res.redirect('/marketplace')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static profile(req, res) {
        let id = req.params.id
        Customer.findByPk(id, { include: Product })
            .then(data => {
                res.render('customerProfile', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static addToCart(req, res) {
        let id = req.params.id
        Seller.findByPk(id)
            .then(data => {
                res.render('addProduct', data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static checkoutCart(req, res) {
        let ProductId = req.params.id
        const { productName, price, stock, SellerId, type, size, requirement } = req.body
        const product = (productName, price, stock, SellerId)
        const productDescription = { type, size, requirement, ProductId }

        Product.create(product)
            .then()



    }
}

// router.get('/create', CustomerController.createAccount)
// router.get('/login', CustomerController.loginAccount)
// router.get('/:id/profile', CustomerController.profile)
// router.get('/:id/buy', CustomerController.buyProduct)
// router.post('/:id/buy', CustomerController.checkoutCart)


module.exports = CustomerController