import { Router } from "express";
import { cancelCart, payCart } from "../controllers/cartController";

const router = Router();

router.get("/:id",()=>{});

router.patch("cancel/:id",cancelCart);
router.put("/payment",payCart)

export default router;