"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const { getProfile } = require("./middleware/getProfile");
const { getTodos, deleteTodo, updateTodo, createTodo, } = require("./service");
const app = (0, express_1.default)();
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);
// listTodos
app.get("/todos", getProfile, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield getTodos(req);
    if (!todos.length)
        return res.status(404).end();
    res.json(todos);
}));
// deleteTodo
app.delete("/todos", getProfile, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = yield deleteTodo(req);
    if (amount === 0) {
        return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ message: 'Todo deleted successfully' });
}));
// markTodoCompleted / markTodoUncompleted
app.put("/todos/:id", getProfile, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield updateTodo(req);
    if (!todo) {
        return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(todo);
}));
// createTodo
app.post("/todos", getProfile, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield createTodo(req);
    return res.status(200).json(todo);
}));
module.exports = app;
