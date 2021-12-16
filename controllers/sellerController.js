let Seller = require('../models/index').Seller
let Product = require('../models/index').Product
let ProductDescription = require('../models/index')

class SellerController {
    static createAccount(req,res){
        Seller.create()
        .then(data =>{
            res.render('createSeller')
        })
        .catch(err =>{
            res.send(err)
        })
    }
    static loginAccount(req,res){
        res.redirect('/marketplace')
    }




    static profile(req, res) {
        let id = req.params.id
        Seller.findByPk(id, { include: Product })
            .then(data => {
                res.render('sellerProfile', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static addProduct(req, res) {
        let id = req.params.id
        Seller.findByPk(id)
            .then(data => {
                res.render('addProduct', data)
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
            .then()



    }


}



module.exports = SellerController



// router.get('/create', SellerController.createAccount)
// router.get('/login', SellerController.loginAccount)
// router.get('/:id/', SellerController.profile)
// router.get('/:id/add', SellerController.addProduct)
// router.post('/:id/add', SellerController.addProductPost)
