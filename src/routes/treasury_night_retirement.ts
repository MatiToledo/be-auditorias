import express from "express";
import { TreasuryNightRetirementController } from "../controllers/treasury_night_retirement";
import { authMiddleware } from "../middlewares";

const router = express.Router();
const treasuryNightRetirementController =
  new TreasuryNightRetirementController();

router.post("/", authMiddleware, treasuryNightRetirementController.create);

export default router;
