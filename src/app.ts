import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { initDatabase } from "./DB";
import bodyParser from "body-parser";
import { Router } from "./routes";

const app = express();
app.use(bodyParser.json());
app.use(cors());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", Router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

initDatabase();

export { app };
