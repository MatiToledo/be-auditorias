import express from "express";
import ApiRouter from "./route/index";

const Router = express.Router();

Router.use("/example", ApiRouter);

export { Router };
