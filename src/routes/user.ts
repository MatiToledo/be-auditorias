import express from "express";
import { authMiddleware } from "../middlewares";
import { UserController } from "../controllers/user";
import { UserValidate } from "../middlewares/validators/user";

const router = express.Router();
const userController = new UserController();

router.get("/me", authMiddleware, userController.me);
router.get("/all", authMiddleware, UserValidate.getAll, userController.getAll);

export default router;
