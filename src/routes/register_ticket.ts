import express from "express";
import { RegisterTicketController } from "../controllers/register_ticket";
import { authMiddleware } from "../middlewares";

const router = express.Router();
const registerTicketController = new RegisterTicketController();

router.get("/:BranchId", registerTicketController.findByBranchId);

export default router;
