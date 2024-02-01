import express from "express";
import { Auth_BOController } from "../../controllers/back_office/auth";
import { Auth_BOValidate } from "../../middlewares/validators/back_office/auth";

const router = express.Router();
const authBOController = new Auth_BOController();

router.post("/", Auth_BOValidate.create, authBOController.create);
router.get("/token", Auth_BOValidate.logIn, authBOController.logIn);

export default router;
