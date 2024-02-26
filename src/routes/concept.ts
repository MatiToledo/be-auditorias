import express from "express";
import { ConceptController } from "../controllers/concept";
import { authMiddleware } from "../middlewares";
import { ConceptValidate } from "../middlewares/validators/concept";

const router = express.Router();
const conceptController = new ConceptController();

router.post(
  "/",
  authMiddleware,
  ConceptValidate.create,
  conceptController.create
);
router.get(
  "/all",
  authMiddleware,
  ConceptValidate.getAll,
  conceptController.getAll
);

export default router;
