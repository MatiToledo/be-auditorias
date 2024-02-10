import express from "express";
import AuthRouter from "./auth";
import UserRouter from "./user";
import CompanyRouter from "./company";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/company", CompanyRouter);

export default router;
