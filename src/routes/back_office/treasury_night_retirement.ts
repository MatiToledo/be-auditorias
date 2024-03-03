import express from "express";
import { TreasuryNightRetirementBackOfficeController } from "../../controllers/back_office/treasury_night_retirement";
import { authAdminMiddleware } from "../../middlewares";
import { TreasuryNightRetirementBackOfficeValidate } from "../../middlewares/validators/back_office/treasury_night_retirement";

const router = express.Router();
const treasuryNightRetirementBackOfficeController =
  new TreasuryNightRetirementBackOfficeController();

router.get(
  "/all",
  authAdminMiddleware,
  TreasuryNightRetirementBackOfficeValidate.getAll,
  treasuryNightRetirementBackOfficeController.getAll
);

export default router;
