import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./model";
import todoRouter from "./routes/todo";
import authRouter from "./routes/auth";
import cors from "cors";

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.use("/", todoRouter);
app.use("/", authRouter);

export default app;
