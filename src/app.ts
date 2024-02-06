import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { initDatabase } from "./DB";
import Router from "./routes";
import RouterBackOffice from "./routes/back_office";

const app = express();
app.use(bodyParser.json());
app.use(cors());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/v1", Router);
app.use("/v1/back_office", RouterBackOffice);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

initDatabase();

export { app };
