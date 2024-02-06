import express from "express";
import AuthRouter from "./auth";
import UserRouter from "./user";
import RegisterBarClosureRouter from "./register_bar_closure";
import RegisterBarRouter from "./register_bar";
import RegisterTicketClosureRouter from "./register_ticket_closure";
import CompanyRouter from "./company";
const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/register_bar_closure", RegisterBarClosureRouter);
router.use("/register_bar", RegisterBarRouter);
router.use("/register_ticket_closure", RegisterTicketClosureRouter);
router.use("/company", CompanyRouter);

export default router;
