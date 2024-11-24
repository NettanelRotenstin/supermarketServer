import { Router } from "express";
import { getProdutsByCategory, getAllProducts } from "../controllers/productController";

const router = Router();

router.get("/search/:name",()=>{});

router.get("/:category", getProdutsByCategory)

router.get("/", getAllProducts)


export default router;