import { Socket } from "socket.io";
import {
  getAllProdutsService,
  getByNameService,
  getProdutsByCategoryService,
} from "../services/productService";
import { getProdutsByCategory } from "../controllers/productController";
import { addToCart } from "../services/cartService";
import { addProduct } from "./funcsForSocket";
import { io } from "../app";

export const handelSocketConnection = async (client: Socket) => {
  console.log("client connected");

  //when client connect he will get all products
  client.on("get-allProducts", async () => {
    try {
      const products = await getAllProdutsService();
      client.emit("allProducts", products);
    } catch (error) {
      console.error("Error fetching all products:", error);
      client.emit("error", "Failed to fetch products.");
    }
  });
  client.on("productsByCategory", async (data) => {
    client.emit("productsByCategory", await getProdutsByCategoryService(data));
  });
  client.on("productsByName", async (data) => {
    client.emit("productsByCategory", await getByNameService(data));
  });

  client.on("addToCart", async (data) => {
    try {
      await addToCart(data);

      client.emit("addToCartSuccess");
    } catch (error) {
      console.error("Error adding to cart:", error);
      client.emit("error", "Failed to add to cart.");
    }
  });
  client.on('newProduct',async(data)=>{
    await addProduct(data)
    io.emit('allProducts',getAllProdutsService)
  })
};
