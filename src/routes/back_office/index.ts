import express from "express";
import AuthRouter from "./auth";
import UserRouter from "./user";
import CompanyRouter from "./company";
import GroupRouter from "./group";
import BranchRouter from "./branch";
import RegisterBarRouter from "./register_bar";
import RegisterBarClosureRouter from "./register_bar_closure";
import RegisterTicketClosureRouter from "./register_ticket_closure";
import RegisterTicketRouter from "./register_ticket";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/company", CompanyRouter);
router.use("/group", GroupRouter);
router.use("/branch", BranchRouter);
router.use("/register_bar", RegisterBarRouter);
router.use("/register_bar_closure", RegisterBarClosureRouter);
router.use("/register_ticket_closure", RegisterTicketClosureRouter);
router.use("/register_ticket", RegisterTicketRouter);

export default router;
