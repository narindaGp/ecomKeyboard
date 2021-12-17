const { Customer, Product } = require('../models/index')
// const Product = require('../models/index').Product
const nodemailer = require("nodemailer");

const bcrypt = require('bcryptjs')


class CustomerController {

    static findAll(req, res) {
        Customer.findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })

    }
    static createAccount(req, res) {
        res.render('createCustomer')
    }

    static createAccountPost(req, res) {
        console.log('a')
        // console.log(req.body)
        let balance = 0
        const { customerName, email, password } = req.body
        let input = { customerName, email, password, balance}
        Customer.create(input)
            .then(data => {
                res.redirect('/')
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
        console.log(req.body)


        Customer.findOne({ where: { email } })
            .then(data => {
                if (data) {
                    // console.log(data)
                    const isValidPassword = bcrypt.compareSync(password, data.password)
                    if (isValidPassword) {
                        console.log(data)
                        console.log('masuk')
                        res.redirect(`/customer/${data.id}/cart`)
                        // res.render(`customerCart`)

                    }
                    else {
                     

                        const errormsg = "invalid password"
                        res.redirect(`/customer/login?error=${errormsg}`)
                    }
                }
                else {
                    console.log('tidak luar')

                    const errormsg = "invalid username"
                    res.redirect(`/customer/login?error=${errormsg}`)

                }
            })
            .catch(err => {
                console.log('er')
                res.send(err)
            })
    }

    static cart(req, res) {
        let id = req.params.id
        Customer.findByPk(id, { include: Product})
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
            .then(data => {
                Customer.balance += topUp
                res.redirect('/customer/:id/cart')
            })
            .catch(err => {
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
                    data.saldo -= totalCost
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