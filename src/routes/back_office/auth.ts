import express from "express";
import { Auth_BOController } from "../../controllers/back_office/auth";

const router = express.Router();
const authBOController = new Auth_BOController();

router.post("/", authBOController.createAuth);

export default router;
