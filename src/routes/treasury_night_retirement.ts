import express from "express";
import { TreasuryNightRetirementController } from "../controllers/treasury_night_retirement";
import { authMiddleware } from "../middlewares";
import { TreasuryNightRetirementValidate } from "../middlewares/validators/treasury_night_retirement";

const router = express.Router();
const treasuryNightRetirementController =
  new TreasuryNightRetirementController();

router.post(
  "/",
  authMiddleware,
  TreasuryNightRetirementValidate.create,
  treasuryNightRetirementController.create
);

export default router;
