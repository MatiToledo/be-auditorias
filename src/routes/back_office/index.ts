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
import TreasuryNightRetirementRouter from "./treasury_night_retirement";
import TreasuryNightRetirementFinishRouter from "./treasury_night_retirement_finish";
import TreasuryNightExpenseRouter from "./treasury_night_expense";
import TreasuryCentralRouter from "./treasury_central";

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
router.use("/treasury_night_retirement", TreasuryNightRetirementRouter);
router.use(
  "/treasury_night_retirement_finish",
  TreasuryNightRetirementFinishRouter
);
router.use("/treasury_night_expense", TreasuryNightExpenseRouter);
router.use("/treasury_central", TreasuryCentralRouter);

export default router;
