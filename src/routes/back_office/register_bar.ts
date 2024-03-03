import express from "express";
import { RegisterBarBackOfficeController } from "../../controllers/back_office/register_bar";
import { authAdminMiddleware } from "../../middlewares";
import { RegisterBarBackOfficeValidate } from "../../middlewares/validators/back_office/register_bar";

const router = express.Router();
const registerBarBackOfficeController = new RegisterBarBackOfficeController();
router.post(
  "/",
  authAdminMiddleware,
  RegisterBarBackOfficeValidate.create,
  registerBarBackOfficeController.create
);
router.get(
  "/all",
  authAdminMiddleware,
  RegisterBarBackOfficeValidate.getAll,
  registerBarBackOfficeController.getAll
);

export default router;
