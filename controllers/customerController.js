const Customer = require('../models/index').Customer
const Product = require('../models/index').Product

const bcrypt = require('bcryptjs')


class CustomerController {
    static createAccount(req, res) {
        res.render('createCustomer')
    }
    
    static createAccountPost(req, res) {
        const { fullName, email, password } = req.body
        let input = { fullName, email, password }
        Customer.create(input)
            .then(data => {
                res.redirect('/customer/login')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static loginAccount(req, res) {
        res.render('loginCustomer')
    }

    static loginAccountPost(req, res) {
        const { email, password } = req.body
        let input = { email, password }
        Customer.findOne({ where: { email } })
            .then(data => {
                if (data) {

                    const isValidPassword = bcrypt.compareSync(password, data.password)
                    if (isValidPassword) {
                        return res.redirect('/marketplace')
                    }   
                    else{
                        const errormsg = "invalid password"
                        return res.redirect(`/customer/login?error=${errormsg}`)
                    }

                }
                else{
                    const errormsg = "invalid username"
                    return res.redirect(`/customer/login?error=${errormsg}`)

                }
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
        Customer.findByPk(id)
            .then(data => {
                res.render('addProduct', data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static checkoutCart(req, res) {




    }
}

// router.get('/create', CustomerController.createAccount)
// router.get('/login', CustomerController.loginAccount)
// router.get('/:id/profile', CustomerController.profile)
// router.get('/:id/buy', CustomerController.buyProduct)
// router.post('/:id/buy', CustomerController.checkoutCart)


module.exports = CustomerController