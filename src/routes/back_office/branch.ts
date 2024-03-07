import express from "express";
import { BranchBackOfficeController } from "../../controllers/back_office/branch";
import { authAdminMiddleware } from "../../middlewares";
import { BranchBackOfficeValidate } from "../../middlewares/validators/back_office/branch";

const router = express.Router();
const branchBackOfficeController = new BranchBackOfficeController();

router.post(
  "/",
  authAdminMiddleware,
  BranchBackOfficeValidate.create,
  branchBackOfficeController.create
);

router.put(
  "/:id",
  authAdminMiddleware,
  BranchBackOfficeValidate.update,
  branchBackOfficeController.update
);
router.delete("/:id", authAdminMiddleware, branchBackOfficeController.delete);

router.get(
  "/all/:GroupId",
  authAdminMiddleware,
  BranchBackOfficeValidate.getAllByGroupId,
  branchBackOfficeController.getAllByCompanyId
);
router.get(
  "/all",
  authAdminMiddleware,
  BranchBackOfficeValidate.getAll,
  branchBackOfficeController.getAll
);

export default router;
