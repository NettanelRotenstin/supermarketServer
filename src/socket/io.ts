import { Socket } from "socket.io";
import { getAllProdutsService, getByNameService, getProdutsByCategoryService } from "../services/productService";
import { getProdutsByCategory } from "../controllers/productController";
 
 

export const handelSocketConnection = async (client: Socket) => {
    //when client connect he will get all products
    client.on("iAmConnected", async () => {
        client.emit('allProducts', await getAllProdutsService())
        //client.emit('myProfile',await)
    })
     client.on('productsByCategory',async(data)=>{
        client.emit('productsByCategory',await getProdutsByCategoryService(data))
     })
     client.on('productsByName',async(data)=>{
        client.emit('productsByCategory',await getByNameService(data))
     })

}