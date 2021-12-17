const Seller = require('../models/index').Seller
const Product = require('../models/index').Product
const ProductDescription = require('../models/index')

const bcrypt = require('bcryptjs')

class SellerController {
  
    static loginAccount(req, res) {
        res.render('loginSeller')
    }

    static loginAccountPost(req, res) {
        const { email, password } = req.body
        Seller.findOne({ where: { email } })
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



    static profile(req, res) {
        Seller.findAll( { include: Product })
            .then(data => {
                res.render('sellerProfile', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static addProduct(req, res) {
        Seller.findAll()
            .then(data => {
                res.render('addProduct', {data})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addProductPost(req, res) {
        let ProductId = req.params.id
        const { productName, price, stock, SellerId, type, size, requirement } = req.body
        const product = (productName, price, stock, SellerId)
        const productDescription = { type, size, requirement, ProductId }

        Product.create(product)
            .then(data => {
                return data
            })
        ProductDescription.create(productDescription)
            .then(data => {
                res.redirect('/seller/:id')
            })
            .catch(err =>{
                res.send(err)
            })

    }
  static createAccount(req, res) {
        res.render('createSeller')
    }
    static createAccountPost(req, res) {
        const { fullName, email, password } = req.body
        let input = { fullName, email, password }
        Seller.create(input)
            .then(data => {
                res.redirect('/seller/login')
            })
            .catch(err => {
                res.send(err)
            })
    }

}



module.exports = SellerController



// router.get('/create', SellerController.createAccount)
// router.get('/login', SellerController.loginAccount)
// router.get('/:id/', SellerController.profile)
// router.get('/:id/add', SellerController.addProduct)
// router.post('/:id/add', SellerController.addProductPost)
