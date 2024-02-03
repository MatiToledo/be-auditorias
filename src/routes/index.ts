import express from "express";
import AuthRouter from "./auth";
import RegisterBarClosureRouter from "./register_bar_closure";
import RegisterTicketClosureRouter from "./register_ticket_closure";
const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/register_bar_closure", RegisterBarClosureRouter);
router.use("/register_ticket_closure", RegisterTicketClosureRouter);

export default router;
