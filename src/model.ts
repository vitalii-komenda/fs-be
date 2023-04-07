import {Sequelize, Model, DataTypes} from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
});

class User extends Model {}
User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

class Todo extends Model {}
Todo.init(
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
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
