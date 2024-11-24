import { Socket } from "socket.io";
import { getAllProdutsService, getByNameService, getProdutsByCategoryService } from "../services/productService";
import { getProdutsByCategory } from "../controllers/productController";
import { addToCart } from "../services/cartService";
 
 

export const handelSocketConnection = async (client: Socket) => {
   console.log("client conncted");
   
    //when client connect he will get all products
    client.on("allProducts", async () => {
        client.emit('allProducts', await getAllProdutsService())
        //client.emit('myProfile',await)
    })
     client.on('productsByCategory',async(data)=>{
        client.emit('productsByCategory',await getProdutsByCategoryService(data))
     })
     client.on('productsByName',async(data)=>{
        client.emit('productsByCategory',await getByNameService(data))
     })
     client.on("addToCart",async (data) => {
         console.log("vyhj",data);
         
          await addToCart(data)
     })

}