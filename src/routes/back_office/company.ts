import express from "express";
import { CompanyBackOfficeController } from "../../controllers/back_office/company";
import { authAdminMiddleware } from "../../middlewares";
import { CompanyBackOfficeValidate } from "../../middlewares/validators/back_office/company";

const router = express.Router();
const companyBackOfficeController = new CompanyBackOfficeController();
router.post(
  "/",
  authAdminMiddleware,
  CompanyBackOfficeValidate.create,
  companyBackOfficeController.create
);

router.put(
  "/:id",
  authAdminMiddleware,
  CompanyBackOfficeValidate.update,
  companyBackOfficeController.update
);
router.delete("/:id", authAdminMiddleware, companyBackOfficeController.delete);

router.get("/all", authAdminMiddleware, companyBackOfficeController.getAll);

export default router;
