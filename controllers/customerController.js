const Customer = require('../models/index').Customer
const Product = require('../models/index').Product
const nodemailer = require("nodemailer");

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

        Customer.findOne({ where: { email } })
            .then(data => {
                if (data) {

                    const isValidPassword = bcrypt.compareSync(password, data.password)
                    if (isValidPassword) {
                        return res.redirect('/marketplace')
                    }
                    else {
                        const errormsg = "invalid password"
                        return res.redirect(`/customer/login?error=${errormsg}`)
                    }
                }
                else {
                    const errormsg = "invalid username"
                    return res.redirect(`/customer/login?error=${errormsg}`)

                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static cart(req, res) {
        let id = req.params.id
        Customer.findByPk(id, { include: Product })
            .then(data => {
                res.render('customerCart', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static topUpBalance(req, res) {
        let id = req.params.id
        Customer.findByPk(id)
            .then(data => {
                res.render('topUpBalance', { data })
            })
            .catch(err => {
                res.send(err)
            })

    }
    static topUpBalancePost(req, res) {
        const topUp = req.body
        let id = req.params.id
        Customer.findByPk(id)
        .then(data =>{
             Customer.balance += topUp
             res.redirect('/customer/:id/cart')
        })
        .catch(err =>{
            res.send(err)
        })
    }



    static addToCart(req, res) {
        let id = req.params.id
        Customer.findByPk(id, { include: Product })
            .then(data => {
                res.render('addProduct', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static checkoutCart(req, res) {
        const { saldo, totalCost } = req.body

        let id = req.params.id
        Customer.findByPk(id, { include: Product })
            .then(data => {
                let key = data.Product.ProductReceipt.productKey.map(el => {
                    return el
                })
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "stephaophy12345@gmail.com",
                        password: "hacktiv8test"
                    }
                })
                const mailOptions = {
                    from: "stephaophy12345@gmail.com",
                    to: data.email,
                    subject: "Sucessful purchase at HackSoftTechX",
                    text: `Thank you for your purchase at HackSoftTechX, below are the product keys required to activate your products\n ${key}`
                }

                if (saldo >= totalCost) {
                    transporter.sendMail(mailOptions, (error, info) => {

                        if (error) {
                            res.send(error)
                        }
                        else {
                            res.redirect('/customer/:id/cart')

                        }
                    })
                }
                else {
                    const errormsg = "Saldo Tidak Cukup"
                    res.redirect(`/customer/:id/cart?=${errormsg}`)
                }
            })
            .catch(err => {
                res.send(err)
            })

    }
}

// router.get('/create', CustomerController.createAccount)
// router.get('/login', CustomerController.loginAccount)
// router.get('/:id/profile', CustomerController.profile)
// router.get('/:id/buy', CustomerController.buyProduct)
// router.post('/:id/buy', CustomerController.checkoutCart)


module.exports = CustomerController