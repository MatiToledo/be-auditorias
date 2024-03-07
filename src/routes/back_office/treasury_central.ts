import express from "express";
import { TreasuryCentralBackOfficeController } from "../../controllers/back_office/treasury_central";
import { authAdminMiddleware } from "../../middlewares";
import { TreasuryCentralBackOfficeValidate } from "../../middlewares/validators/back_office/treasury_central";

const router = express.Router();
const treasuryCentralBackOfficeController =
  new TreasuryCentralBackOfficeController();

router.get(
  "/all",
  authAdminMiddleware,
  TreasuryCentralBackOfficeValidate.getAll,
  treasuryCentralBackOfficeController.getAll
);
router.put(
  "/:id",
  authAdminMiddleware,
  TreasuryCentralBackOfficeValidate.update,
  treasuryCentralBackOfficeController.update
);
router.delete(
  "/:id",
  authAdminMiddleware,
  treasuryCentralBackOfficeController.delete
);
export default router;
