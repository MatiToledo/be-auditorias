import express from "express";
import { RegisterTicketClosureBackOfficeController } from "../../controllers/back_office/register_ticket_closure";
import { authAdminMiddleware } from "../../middlewares";
import { RegisterTicketClosureBackOfficeValidate } from "./../../middlewares/validators/back_office/register_ticket_closure";

const router = express.Router();
const registerTicketClosureBackOfficeController =
  new RegisterTicketClosureBackOfficeController();

router.get(
  "/all",
  authAdminMiddleware,
  RegisterTicketClosureBackOfficeValidate.getAll,
  registerTicketClosureBackOfficeController.getAll
);
router.put(
  "/:id",
  authAdminMiddleware,
  RegisterTicketClosureBackOfficeValidate.update,
  registerTicketClosureBackOfficeController.update
);
router.delete(
  "/:id",
  authAdminMiddleware,
  registerTicketClosureBackOfficeController.delete
);
export default router;
