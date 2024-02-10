import express from "express";
import { CompanyBackOfficeController } from "../../controllers/back_office/company";
import { authAdminMiddleware } from "../../middlewares";

const router = express.Router();
const companyBackOfficeController = new CompanyBackOfficeController();

router.get("/all", authAdminMiddleware, companyBackOfficeController.getAll);

export default router;
