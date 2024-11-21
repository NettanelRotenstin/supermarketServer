import { Router } from "express";
import { cancelCart } from "../controllers/cartController";

const router = Router();

router.get("/:id",()=>{});

router.patch("cancel/:id",cancelCart);
export default router;