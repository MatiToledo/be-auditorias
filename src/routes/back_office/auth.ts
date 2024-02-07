import express from "express";
import { AuthBOController } from "../../controllers/back_office/auth";
import { AuthBOValidate } from "../../middlewares/validators/back_office/auth";

const router = express.Router();
const authBOController = new AuthBOController();

router.post("/", AuthBOValidate.create, authBOController.create);
router.get("/token", AuthBOValidate.logIn, authBOController.logIn);

export default router;
