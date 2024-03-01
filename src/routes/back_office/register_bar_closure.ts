import express from "express";
import { RegisterBarClosureBackOfficeController } from "../../controllers/back_office/register_bar_closure";
import { authAdminMiddleware } from "../../middlewares";
import { RegisterBarClosureBackOfficeValidate } from "../../middlewares/validators/back_office/register_bar_closure";

const router = express.Router();
const registerBarClosureBackOfficeController =
  new RegisterBarClosureBackOfficeController();

router.get(
  "/all",
  authAdminMiddleware,
  RegisterBarClosureBackOfficeValidate.getAll,
  registerBarClosureBackOfficeController.getAll
);

export default router;
