const router = require('express').Router()
const customerRoute = require('./customer')
const productRoute = require('./product')
const sellerRoute = require('./seller')



router.get('/', (req, res) => {
    res.send('Hello World!')
  })

//   router.get('/', (req, res) => {
//     res.render('verification')
//   })
//   router.get('/marketplace', (req, res) => {
//     res.render('marketplace')
//   })


router.use('/customer', customerRoute)
router.use('/product', productRoute)
router.use('/seller', sellerRoute)


module.exports = router