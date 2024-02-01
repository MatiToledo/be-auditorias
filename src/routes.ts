import express from "express";
import ApiRouter from "./routes/index";

const Router = express.Router();

Router.use("/", ApiRouter);

export { Router };
