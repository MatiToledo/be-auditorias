import express from "express";
import { ConceptBackOfficeController } from "../../controllers/back_office/concept";
import { authAdminMiddleware } from "../../middlewares";
import { ConceptBackOfficeValidate } from "../../middlewares/validators/back_office/concept";

const router = express.Router();
const conceptBackOfficeController = new ConceptBackOfficeController();

router.get(
  "/all",
  authAdminMiddleware,
  ConceptBackOfficeValidate.getAll,
  conceptBackOfficeController.getAll
);

export default router;
