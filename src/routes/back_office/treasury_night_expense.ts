import express from "express";
import { TreasuryNightExpenseBackOfficeController } from "../../controllers/back_office/treasury_night_expense";
import { authAdminMiddleware } from "../../middlewares";
import { TreasuryNightExpenseBackOfficeValidate } from "../../middlewares/validators/back_office/treasury_night_expense";

const router = express.Router();
const treasuryNightExpenseBackOfficeController =
  new TreasuryNightExpenseBackOfficeController();

router.get(
  "/all",
  authAdminMiddleware,
  TreasuryNightExpenseBackOfficeValidate.getAll,
  treasuryNightExpenseBackOfficeController.getAll
);

export default router;
