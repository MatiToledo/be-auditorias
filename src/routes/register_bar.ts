import express from "express";
import { RegisterBarController } from "../controllers/register_bar";
import { authMiddleware } from "../middlewares";
import { RegisterBarClosureValidate } from "../middlewares/validators/register_bar_closure";

const router = express.Router();
const registerBarController = new RegisterBarController();

router.get("/:BranchId", authMiddleware, registerBarController.findByBranchId);

export default router;
