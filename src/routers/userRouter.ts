import { Router } from "express";
import { getProfile, login, register } from "../controllers/userController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/profile", getProfile);

export default router;
