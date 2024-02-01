import express from "express";
import { AuthController } from "../controllers/auth";

const router = express.Router();
const authController = new AuthController();

router.get("/", authController.createAuth);

export default router;
