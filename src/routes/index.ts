/**
 * this is boilerplate code for a route
 * here you should add all the routes
 * of the API
 */
import express from "express";
import AuthRouter from "./auth";
const router = express.Router();

router.use("/auth", AuthRouter);

export default router;
