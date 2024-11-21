import { Router } from "express";
import { cancelCart, history, payCart } from "../controllers/cartController";

const router = Router();

router.get("/:id",()=>{});

router.patch("cancel/:id",cancelCart);
router.put("/payment",payCart)
router.get("/history",history)

export default router;