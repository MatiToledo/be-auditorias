import express from "express";
import { TreasuryNightRetirementBackOfficeController } from "../../controllers/back_office/treasury_night_retirement";
import { authAdminMiddleware } from "../../middlewares";

const router = express.Router();
const treasuryNightRetirementBackOfficeController =
  new TreasuryNightRetirementBackOfficeController();

router.get(
  "/all",
  authAdminMiddleware,
  // RegisterTicketClosureBackOfficeValidate.getAll,
  treasuryNightRetirementBackOfficeController.getAll
);

export default router;
