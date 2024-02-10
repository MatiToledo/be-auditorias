import express from "express";
import AuthRouter from "./auth";
import UserRouter from "./user";
import CompanyRouter from "./company";
import GroupRouter from "./group";
import BranchRouter from "./branch";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/company", CompanyRouter);
router.use("/group", GroupRouter);
router.use("/branch", BranchRouter);

export default router;
