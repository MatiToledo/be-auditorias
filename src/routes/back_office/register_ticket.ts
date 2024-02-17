import express from "express";
import { RegisterTicketBackOfficeController } from "../../controllers/back_office/register_ticket";
import { authAdminMiddleware } from "../../middlewares";
import { RegisterTicketBackOfficeValidate } from "../../middlewares/validators/back_office/register_ticket";

const router = express.Router();
const registerTicketBackOfficeController =
  new RegisterTicketBackOfficeController();

router.get(
  "/all",
  authAdminMiddleware,
  RegisterTicketBackOfficeValidate.getAll,
  registerTicketBackOfficeController.getAll
);

export default router;
