import express from "express";
import { RegisterTicketBackOfficeController } from "../../controllers/back_office/register_ticket";
import { authAdminMiddleware } from "../../middlewares";
import { RegisterTicketBackOfficeValidate } from "../../middlewares/validators/back_office/register_ticket";

const router = express.Router();
const registerTicketBackOfficeController =
  new RegisterTicketBackOfficeController();
router.post(
  "/",
  authAdminMiddleware,
  RegisterTicketBackOfficeValidate.create,
  registerTicketBackOfficeController.create
);
router.get(
  "/all",
  authAdminMiddleware,
  RegisterTicketBackOfficeValidate.getAll,
  registerTicketBackOfficeController.getAll
);
router.put(
  "/:id",
  authAdminMiddleware,
  RegisterTicketBackOfficeValidate.update,
  registerTicketBackOfficeController.update
);
router.delete(
  "/:id",
  authAdminMiddleware,
  registerTicketBackOfficeController.delete
);
export default router;
