import { Request } from "express";

const getTodos = async (req: Request) => {
  const { Todo } = req.app.get("models");
  return await Todo.findAll();
};

const deleteTodo = async (req: Request) => {
  const { Todo } = req.app.get("models");

  return await Todo.destroy({
    where: {
      id: req.body.id,
    },
  });
};

const updateTodo = async (req: Request) => {
  const { Todo } = req.app.get("models");

  return await Todo.update(
    { completed: req.body.completed },
    { where: { id: req.params.id } }
  );
};

const createTodo = async (req: Request & { user: { id: number } }) => {
  const { Todo } = req.app.get("models");

  return await Todo.create({ title: req.body.title, UserId: req.user.id });
};

export { getTodos, deleteTodo, updateTodo, createTodo };
