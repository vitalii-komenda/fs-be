const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
});

class User extends Sequelize.Model {}
User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

class Todo extends Sequelize.Model {}
Todo.init(
  {
    title: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Todo",
  }
);


User.hasMany(Todo, { as: "User", foreignKey: "UserId" });
Todo.belongsTo(User, { as: "User" });


module.exports = {
  sequelize,
  User,
  Todo,
};
