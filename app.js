/*
npx sequelize-cli model:generate --name Seller --attributes sellerName:string,email:string,password:string,balance:integer
npx sequelize-cli model:generate --name Product --attributes productName:string,price:integer,stock:integer,SellerId:integer
npx sequelize-cli model:generate --name Customer --attributes customerName:string,email:string,password:string,balance:integer
npx sequelize-cli model:generate --name ProductReceipt --attributes ProductId:integer,CustomerId:integer,productKey:string

*/


const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')

app.set('view engine', 'ejs')
app.use('/', express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(routes)



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})