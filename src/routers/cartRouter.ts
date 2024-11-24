import { Router } from "express";
import { cancelCart, cartById, history, payCart } from "../controllers/cartController";

const router = Router();

router.get("/:id",()=>{});

router.patch("cancel/:id",cancelCart);
router.put("/payment",payCart)
router.get("/history",history)
router.get("/userCart/:id",cartById)

export default router;