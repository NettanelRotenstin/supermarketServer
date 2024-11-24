import { Router } from "express";
import { getProdutsByCategory, getAllProducts, getProductByName } from "../controllers/productController";

const router = Router();

router.get("/search/:name",getProductByName);

router.get("/:category", getProdutsByCategory)

router.get("/", getAllProducts)


export default router;