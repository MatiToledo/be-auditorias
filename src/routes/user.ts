import express from "express";
import { authMiddleware } from "../middlewares";
import { UserController } from "../controllers/user";

const router = express.Router();
const userController = new UserController();

router.get("/me", authMiddleware, userController.me);

export default router;
