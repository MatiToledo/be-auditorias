import express from "express";
import { RegisterBarClosureController } from "../controllers/register_bar_closure";
import { RegisterBarClosureValidate } from "../middlewares/validators/register_bar_closure";

const router = express.Router();
const registerBarClosureController = new RegisterBarClosureController();

router.post(
  "/",
  RegisterBarClosureValidate.create,
  registerBarClosureController.create
);

export default router;
