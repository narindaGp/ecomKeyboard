# ecomKeyboard
buat e-commerce iseng iseng biar pair programing ngga bengong


routes

/ = home
/customer = list data/ profil customer, edit alamat atau no telp | top up uang default 0
/customer/buy = list product yang akan di beli (pending, bayar lunas, beli acc) = status | option buy
/customer/create = input data customer
/customer/login = login customer

/seller = list data/ profil seller, edit alamat atau no telp | income statement
/seller/sell = list product yang akan di beli (pending, bayar lunas, beli acc) = status |option sell
/seller/create = input data seller
/seller/login = login seller
/seller/:id = untuk stock product
/seller/:ProductId/detail = sda tapi statis tak bisa diubah

/product = list data product
/product/:id/addDetail = mengubah data desktipsi 


