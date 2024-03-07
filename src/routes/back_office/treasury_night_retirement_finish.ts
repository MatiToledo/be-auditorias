import express from "express";
import { TreasuryNightRetirementFinishBackOfficeController } from "../../controllers/back_office/treasury_night_retirement_finish";
import { authAdminMiddleware } from "../../middlewares";
import { TreasuryNightRetirementFinishBackOfficeValidate } from "../../middlewares/validators/back_office/treasury_night_retirement_finish";

const router = express.Router();
const treasuryNightRetirementFinishBackOfficeController =
  new TreasuryNightRetirementFinishBackOfficeController();

router.get(
  "/all",
  authAdminMiddleware,
  TreasuryNightRetirementFinishBackOfficeValidate.getAll,
  treasuryNightRetirementFinishBackOfficeController.getAll
);
router.put(
  "/:id",
  authAdminMiddleware,
  TreasuryNightRetirementFinishBackOfficeValidate.update,
  treasuryNightRetirementFinishBackOfficeController.update
);
router.delete(
  "/:id",
  authAdminMiddleware,
  treasuryNightRetirementFinishBackOfficeController.delete
);
export default router;
