import express from "express";
import { authMiddleware } from "../middlewares";
import { TreasuryNightExpenseValidate } from "../middlewares/validators/treasury_night_expense";
import { TreasuryNightExpenseController } from "../controllers/treasury_night_expense";

const router = express.Router();
const treasuryNightExpenseController = new TreasuryNightExpenseController();

router.post(
  "/",
  authMiddleware,
  TreasuryNightExpenseValidate.create,
  treasuryNightExpenseController.create
);

export default router;
