import express from "express";
import { AuthController } from "../controllers/auth";
import { AuthValidate } from "./../middlewares/validators/auth";

const router = express.Router();
const authController = new AuthController();

router.post("/token", AuthValidate.logIn, authController.logIn);

export default router;
