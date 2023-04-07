"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const model_1 = require("./model");
const todo_1 = __importDefault(require("./routes/todo"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.set("sequelize", model_1.sequelize);
app.set("models", model_1.sequelize.models);
app.use('/', todo_1.default);
exports.default = app;
