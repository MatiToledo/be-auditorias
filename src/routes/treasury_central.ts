import express from "express";
import { TreasuryCentralController } from "../controllers/treasury_central";
import { authMiddleware } from "../middlewares";
import { TreasuryCentralValidate } from "../middlewares/validators/treasury";

const router = express.Router();
const treasuryCentralController = new TreasuryCentralController();

router.post(
  "/",
  authMiddleware,
  TreasuryCentralValidate.create,
  treasuryCentralController.create
);

router.put(
  "/",
  authMiddleware,
  TreasuryCentralValidate.update,
  treasuryCentralController.update
);

router.delete(
  "/:id",
  authMiddleware,
  TreasuryCentralValidate.delete,
  treasuryCentralController.delete
);

router.get(
  "/all/:BranchId",
  authMiddleware,
  TreasuryCentralValidate.getAllByBranchId,
  treasuryCentralController.getAllByBranchId
);

export default router;
