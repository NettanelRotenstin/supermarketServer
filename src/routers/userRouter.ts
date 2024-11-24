import { Router } from "express";
import { autoVerify, getProfile, login, register } from "../controllers/userController";
import verifyUser from "../middleware/verifyUser";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/profile", verifyUser ,getProfile);
router.post("/verify", verifyUser, autoVerify);

export default router;
