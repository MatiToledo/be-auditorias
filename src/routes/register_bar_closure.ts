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
  RegisterBarClosureValidate.checkIfAlreadyCloseThatDay,
  registerBarClosureController.checkIfAlreadyCloseThatDay
);

router.get(
  "/all/:BranchId",
  authMiddleware,
  registerBarClosureController.getAllByBranchId
);

export default router;
