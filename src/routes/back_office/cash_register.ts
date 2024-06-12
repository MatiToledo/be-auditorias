import express from "express";
import { CashRegisterBackOfficeController } from "../../controllers/back_office/cash_register";
import { authAdminMiddleware } from "../../middlewares";

const router = express.Router();
const cashRegisterBackOfficeController = new CashRegisterBackOfficeController();

router.get(
  "/all",
  authAdminMiddleware,
  //   cashRegisterBackOfficeValidate.getAll,
  cashRegisterBackOfficeController.getAll
);

router.put(
  "/:id",
  authAdminMiddleware
  // cashRegisterBackOfficeController.update,
  // cashRegisterBackOfficeController.update
);

export default router;
