import express from "express";
import { RegisterBarClosureController } from "../controllers/register_bar_closure";
import { RegisterBarClosureValidate } from "../middlewares/validators/register_bar_closure";
import { authMiddleware } from "../middlewares";
import { ConceptValidate } from "../middlewares/validators/concept";
import { ConceptController } from "../controllers/concept";

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
