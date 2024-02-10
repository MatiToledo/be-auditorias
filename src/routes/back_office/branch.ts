import express from "express";
import { BranchBackOfficeController } from "../../controllers/back_office/branch";
import { authAdminMiddleware } from "../../middlewares";
import { BranchBackOfficeValidate } from "../../middlewares/validators/back_office/branch";

const router = express.Router();
const branchBackOfficeController = new BranchBackOfficeController();

router.get(
  "/all/:GroupId",
  authAdminMiddleware,
  BranchBackOfficeValidate.getAllByGroupId,
  branchBackOfficeController.getAllByCompanyId
);

export default router;
