import express from "express";
import { GroupBackOfficeController } from "../../controllers/back_office/group";
import { authAdminMiddleware } from "../../middlewares";
import { GroupBackOfficeValidate } from "../../middlewares/validators/back_office/group";

const router = express.Router();
const groupBackOfficeController = new GroupBackOfficeController();

router.get(
  "/all/:CompanyId",
  authAdminMiddleware,
  GroupBackOfficeValidate.getAllByCompanyId,
  groupBackOfficeController.getAllByCompanyId
);
router.get(
  "/all",
  authAdminMiddleware,
  GroupBackOfficeValidate.getAll,
  groupBackOfficeController.getAll
);

router.post(
  "/",
  authAdminMiddleware,
  GroupBackOfficeValidate.create,
  groupBackOfficeController.create
);

export default router;
