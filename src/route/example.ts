import express from "express";
import { ExampleController } from "../controller/example.controller";

const router = express.Router();
const exampleController = new ExampleController();

router.get("/example", exampleController.exampleControllerMethod);

export default router;
