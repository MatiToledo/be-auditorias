import express from "express";
import { RegisterTicketClosureController } from "../controllers/register_ticket_closure";
import { RegisterTicketClosureValidate } from "../middlewares/validators/register_ticket_closure";
import { authMiddleware } from "../middlewares";

const router = express.Router();
const registerTicketClosureController = new RegisterTicketClosureController();

router.post(
  "/",
  authMiddleware,
  RegisterTicketClosureValidate.create,
  registerTicketClosureController.create
);
router.post(
  "/check",
  authMiddleware,
  RegisterTicketClosureValidate.checkIfAlreadyCloseThatDay,
  registerTicketClosureController.checkIfAlreadyCloseThatDay
);

router.get(
  "/all/:BranchId",
  authMiddleware,
  registerTicketClosureController.getAllByBranchId
);
export default router;
