import { Socket } from "socket.io";
import {
  getAllProdutsService,
  getByNameService,
  getProductById,
  getProdutsByCategoryService,
} from "../services/productService";

import {
  addToCart,
  cancelCartService,
  decreaseQuantity,
  getActionById,
  getHistory,
  removeFromCart,
} from "../services/cartService";
import { addProduct } from "./funcsForSocket";
import { io } from "../app";
import { HistoryDto } from "../types/dto/historyDto";

export const handelSocketConnection = async (client: Socket) => {

  //when client connect he will get all products
  client.on("get-allProducts", async (id) => {
    try {
      const products = await getProductById(id);
      io.emit("allProducts", products);
    } catch (error) {
      console.error("Error fetching all products:", error);
      io.emit("error", "Failed to fetch products.");
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
      const updatedCart = await getActionById(data.userId);
      client.emit("cartUpdated", updatedCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      client.emit("error", "Failed to add item to cart.");
    }
  });

  client.on("newProduct", async (data) => {
    await addProduct(data);
    io.emit("allProducts", getAllProdutsService);
  });
  client.on("decQuantity", async (data) => {
    try {
      await decreaseQuantity(data);
      const updatedCart = await getActionById(data.userId);
      io.emit("cartUpdated", updatedCart);
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      io.emit("error", "Failed to decrease quantity.");
    }
  });
  client.on("removeItem", async (data) => {
    try {
      await removeFromCart(data);
      const updatedCart = await getActionById(data.userId);
      io.emit("cartUpdated", updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
      io.emit("error", "Failed to remove item from cart.");
    }
  });
  client.on("clearAllCart", async (userId) => {
    try {
      await cancelCartService(userId);
      const updatedCart = await getActionById(userId);
      io.emit("cartUpdated", updatedCart);
    } catch (error) {
      console.error("Error clearing cart:", error);
      io.emit("error", "Failed to clear cart.");
    }
  });
  client.on("getCart", async (userId) => {
    try {
      const cart = await getActionById(userId);
      io.emit("cartUpdated", cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      io.emit("error", "Failed to fetch cart.");
    }
  });
  client.on('history', async (userId: HistoryDto) => {
    client.emit('history', await getHistory(userId))
  })
};
