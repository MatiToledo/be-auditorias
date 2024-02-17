import express from "express";
import { TreasuryNightRetirementFinishController } from "../controllers/treasury_night_retirement_finish";
import { authMiddleware } from "../middlewares";
import { TreasuryNightRetirementFinishValidate } from "../middlewares/validators/treasury_night_retirement_finish";

const router = express.Router();
const treasuryNightRetirementFinishController =
  new TreasuryNightRetirementFinishController();

router.post(
  "/",
  authMiddleware,
  TreasuryNightRetirementFinishValidate.create,
  treasuryNightRetirementFinishController.create
);

export default router;
