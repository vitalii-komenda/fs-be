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
Object.defineProperty(exports, "__esModule", { value: true });
const getTodos = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { Todo } = req.app.get("models");
    return yield Todo.findAll();
});
const deleteTodo = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { Todo } = req.app.get("models");
    return yield Todo.destroy({ where: {
            id: req.body.id
        } });
});
const updateTodo = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { Todo } = req.app.get("models");
    return yield Todo.update({ completed: req.body.completed }, { where: { id: req.params.id } });
});
const createTodo = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { Todo } = req.app.get("models");
    return yield Todo.create({ title: req.body.title, UserId: req.user.id });
});
module.exports = {
    getTodos,
    deleteTodo,
    updateTodo,
    createTodo,
};
