const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const { getProfile } = require("./middleware/getProfile");
const {
  getTodos,
  deleteTodo,
  updateTodo,
  createTodo,
} = require("./service");
const app = express();
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);


// listTodos
app.get("/todos", getProfile, async (req, res) => {
  const todos = await getTodos(req);
  if (!todos.length) return res.status(404).end();
  res.json(todos);
});

// deleteTodo
app.delete("/todos", getProfile, async (req, res) => {
  const amount = await deleteTodo(req);

  if (amount === 0) {
    return res.status(404).json({message: 'Not found'});
  }

  return res.status(200).json({message: 'Todo deleted successfully'});
});

// markTodoCompleted / markTodoUncompleted
app.put("/todos/:id", getProfile, async (req, res) => {
  const todo = await updateTodo(req);

  if (!todo) {
    return res.status(404).json({message: 'Not found'});
  }

  return res.status(200).json(todo);
});

// createTodo
app.post("/todos", getProfile, async (req, res) => {
  const todo = await createTodo(req);

  return res.status(200).json(todo);
});


module.exports = app;
