/*
npx sequelize-cli model:generate --name seller --attributes sellerName:string,email:string,password:string,address:string,phoneNumber:string,money:integer
npx sequelize-cli model:generate --name product --attributes productName:string,price:integer,stock:integer,SellerId:integer
npx sequelize-cli model:generate --name customer --attributes customerName:string,email:string,password:string,address:string,phoneNumber:string,money:integer

*/


const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(routes)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})