user schema:
username:string
password:string
creditCard:string

 

product schema:
name:string
category:enumCategories
image: string
price:number
quantity:number
prevPrice?:number
description:string




cart schema:
user_id:mongoose...
3:27
totalPrice:number
receipt:[{_idproduct,quantity,price}] (edited) 
date:date
 


מאיר גולדשטיין

PORT = 3000
MONGODB_URI = mongodb://localhost:27017/supermarket
JWT_SECRET = y@?sdgJHBXJhjd684