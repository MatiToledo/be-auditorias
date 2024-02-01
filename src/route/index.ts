/**
 * this is boilerplate code for a route
 * here you should add all the routes
 * of the API
 */
import express from "express";
import Example from "./example";

const router = express.Router();

router.use("/", Example);

export default router;
