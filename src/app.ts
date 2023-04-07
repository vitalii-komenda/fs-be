import express from "express";
import bodyParser from "body-parser";
import {sequelize} from "./model";
import todoRouter from './routes/todo'

const app = express();
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.use('/', todoRouter)

export default app;
