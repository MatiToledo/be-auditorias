import express from "express";
import { ConceptController } from "../controllers/concept";
import { authMiddleware } from "../middlewares";
import { ConceptValidate } from "../middlewares/validators/concept";

const router = express.Router();
const conceptController = new ConceptController();

router.get("/all", ConceptValidate.getAll, conceptController.getAll);

export default router;
