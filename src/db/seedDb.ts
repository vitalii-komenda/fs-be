import { User, Todo } from "../model";

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create tables
  await User.sync({ force: true });
  await Todo.sync({ force: true });
  //insert data
  await Promise.all([
    User.create({
      id: 1,
      name: "Vitalii",
      email: "vitalii@foo.com",
      password: "123",
    }),
    Todo.create({
      id: 1,
      title: "Buy apples",
      completed: false,
      UserId: 1,
    }),
  ]);
}
