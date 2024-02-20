import express from "express";
import { CashRegisterController } from "../controllers/cash_register";
import { authMiddleware } from "../middlewares";
import { CashRegisterValidate } from "../middlewares/validators/cash_register";

const router = express.Router();
const cashRegisterController = new CashRegisterController();

router.post(
  "/",
  authMiddleware,
  CashRegisterValidate.create,
  cashRegisterController.create
);

router.post(
  "/check",
  authMiddleware,
  CashRegisterValidate.checkIfExistByDayAndBranchId,
  cashRegisterController.checkIfExistByDayAndBranchId
);

export default router;
