
const Product = require('../models/index').Product

class ProductController {
    
    static productDetails(req, res){
        let id = req.params.id
        Product.findByPk(id)
        .then(data =>{
            res.render('productDetails', {data})
        })
    }
    

}



module.exports = ProductController