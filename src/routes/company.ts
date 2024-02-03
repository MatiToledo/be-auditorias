import express from "express";
import { authAdminMiddleware } from "../middlewares";
import { CompanyController } from "../controllers/company";
import { CompanyValidate } from "../middlewares/validators/company";

const router = express.Router();
const companyController = new CompanyController();

router.post(
  "/",
  authAdminMiddleware,
  CompanyValidate.create,
  companyController.create
);

export default router;
