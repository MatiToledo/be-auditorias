import express from "express";
import { AuthBOValidate } from "../../middlewares/validators/back_office/auth";
import { AuthBackOfficeController } from "../../controllers/back_office/auth";

const router = express.Router();
const authBOController = new AuthBackOfficeController();

router.post("/", AuthBOValidate.create, authBOController.create);
router.post("/token", AuthBOValidate.logIn, authBOController.logIn);

export default router;
