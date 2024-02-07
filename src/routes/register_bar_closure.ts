import express from "express";
import { RegisterBarClosureController } from "../controllers/register_bar_closure";
import { RegisterBarClosureValidate } from "../middlewares/validators/register_bar_closure";
import { authMiddleware } from "../middlewares";

const router = express.Router();
const registerBarClosureController = new RegisterBarClosureController();

router.post(
  "/",
  authMiddleware,
  RegisterBarClosureValidate.create,
  registerBarClosureController.create
);

router.post(
  "/check",
  authMiddleware,
  registerBarClosureController.checkIfAlreadyCloseThatDay
);

export default router;
