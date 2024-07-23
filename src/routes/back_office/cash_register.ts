import express from "express";
import { CashRegisterBackOfficeController } from "../../controllers/back_office/cash_register";
import { authAdminMiddleware } from "../../middlewares";
import { CashRegisterBackOfficeValidate } from "../../middlewares/validators/back_office/cash_register";

const router = express.Router();
const cashRegisterBackOfficeController = new CashRegisterBackOfficeController();

router.get(
  "/all",
  authAdminMiddleware,
  CashRegisterBackOfficeValidate.getAll,
  cashRegisterBackOfficeController.getAll
);

router.put(
  "/:id",
  authAdminMiddleware,
  CashRegisterBackOfficeValidate.update,
  cashRegisterBackOfficeController.update
);

export default router;
