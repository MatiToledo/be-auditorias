import express from "express";
import AuthRouter from "./auth";
import UserRouter from "./user";
import RegisterBarClosureRouter from "./register_bar_closure";
import RegisterBarRouter from "./register_bar";
import RegisterTicketRouter from "./register_ticket";
import RegisterTicketClosureRouter from "./register_ticket_closure";
import CompanyRouter from "./company";
import TreasuryNightRetirementRouter from "./treasury_night_retirement";
const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/register_bar_closure", RegisterBarClosureRouter);
router.use("/register_bar", RegisterBarRouter);
router.use("/register_ticket", RegisterTicketRouter);
router.use("/register_ticket_closure", RegisterTicketClosureRouter);
router.use("/company", CompanyRouter);
router.use("/treasury_night_retirement", TreasuryNightRetirementRouter);

export default router;
