import { Router, Request, Response } from "express";
import authenticate from "../middleware/authenticate";
import {
  getTodos,
  deleteTodo,
  updateTodo,
  createTodo,
} from "../controllers/todo";

const todoRouter = Router();

// listTodos
todoRouter.get("/todos", authenticate, async (req: Request, res: Response) => {
  const todos = await getTodos(req);
  if (!todos.length) return res.status(404).end();
  res.json(todos);
});

// deleteTodo
todoRouter.delete(
  "/todos",
  authenticate,
  async (req: Request, res: Response) => {
    const amount = await deleteTodo(req);

    if (amount === 0) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  }
);

// markTodoCompleted / markTodoUncompleted
todoRouter.put(
  "/todos/:id",
  authenticate,
  async (req: Request, res: Response) => {
    const todo = await updateTodo(req);

    if (!todo) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(todo);
  }
);

// createTodo
todoRouter.post("/todos", authenticate, async (req: Request, res: Response) => {
  const todo = await createTodo(req);

  return res.status(200).json(todo);
});

export default todoRouter;
