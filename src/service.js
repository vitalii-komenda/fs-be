const getTodos = async (req) => {
  const { Todo } = req.app.get("models");
  return await Todo.findAll();
};

const deleteTodo = async (req) => {
  const { Todo } = req.app.get("models");

  return await Todo.destroy({where:{
    id: req.body.id
  }});
};

const updateTodo = async (req) => {
  const { Todo } = req.app.get("models");

  return await Todo.update(
    { completed: req.body.completed },
    { where: { id: req.params.id } },
  );
};

const createTodo = async (req) => {
  const { Todo } = req.app.get("models");

  return await Todo.create(
    { title: req.body.title, UserId: req.user.id }
  );
};

module.exports = {
  getTodos,
  deleteTodo,
  updateTodo,
  createTodo,
};
