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
const express_1 = require("express");
const get_user_1 = __importDefault(require("../middleware/get-user"));
const todo_1 = require("../controllers/todo");
const todoRouter = (0, express_1.Router)();
// listTodos
todoRouter.get("/todos", get_user_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield (0, todo_1.getTodos)(req);
    if (!todos.length)
        return res.status(404).end();
    res.json(todos);
}));
// deleteTodo
todoRouter.delete("/todos", get_user_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = yield (0, todo_1.deleteTodo)(req);
    if (amount === 0) {
        return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ message: "Todo deleted successfully" });
}));
// markTodoCompleted / markTodoUncompleted
todoRouter.put("/todos/:id", get_user_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield (0, todo_1.updateTodo)(req);
    if (!todo) {
        return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(todo);
}));
// createTodo
todoRouter.post("/todos", get_user_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield (0, todo_1.createTodo)(req);
    return res.status(200).json(todo);
}));
exports.default = todoRouter;
