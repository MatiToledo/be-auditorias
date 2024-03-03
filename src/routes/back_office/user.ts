import express from "express";
import { UserBackOfficeController } from "../../controllers/back_office/user";
import { authAdminMiddleware } from "../../middlewares";
import { UserBackOfficeValidate } from "../../middlewares/validators/back_office/user";

const router = express.Router();
const userBackOfficeController = new UserBackOfficeController();

router.get("/me", authAdminMiddleware, userBackOfficeController.getMe);
router.get(
  "/all",
  authAdminMiddleware,
  UserBackOfficeValidate.getAll,
  userBackOfficeController.getAll
);
router.get(
  "/admin/all",
  authAdminMiddleware,
  UserBackOfficeValidate.getAll,
  userBackOfficeController.getAllAdmins
);

export default router;
