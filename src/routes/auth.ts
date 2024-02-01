import express from "express";
import { AuthController } from "../controllers/auth";

const router = express.Router();
const authController = new AuthController();

router.post("/", authController.createAuth);
router.get("/token", authController.logIn);

export default router;
