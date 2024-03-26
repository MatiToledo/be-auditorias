import express from "express";

import { RegisterBarController } from "../controllers/register_bar";

const router = express.Router();
const registerBarController = new RegisterBarController();

router.get("/:BranchId", registerBarController.findByBranchId);

export default router;
