import express from "express";
import { RegisterTicketClosureController } from "../controllers/register_ticket_closure";
import { RegisterTicketClosureValidate } from "../middlewares/validators/register_ticket_closure";

const router = express.Router();
const registerTicketClosureController = new RegisterTicketClosureController();

router.post(
  "/",
  RegisterTicketClosureValidate.create,
  registerTicketClosureController.create
);

export default router;
