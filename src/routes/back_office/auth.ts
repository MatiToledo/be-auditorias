import express from "express";
import { AuthBackOfficeController } from "../../controllers/back_office/auth";
import { AuthBOValidate } from "../../middlewares/validators/back_office/auth";

const router = express.Router();
const authBOController = new AuthBackOfficeController();

router.post("/admin", AuthBOValidate.createAdmin, authBOController.createAdmin);
router.post("/user", AuthBOValidate.createUser, authBOController.createUser);
router.post("/token", AuthBOValidate.logIn, authBOController.logIn);

export default router;
