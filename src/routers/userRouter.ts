import { Router } from "express";
import { getProfile, login, register } from "../controllers/userController";
import verifyUser from "../middleware/verifyUser";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/profile", verifyUser ,getProfile);

export default router;
