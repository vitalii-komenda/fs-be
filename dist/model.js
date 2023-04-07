"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite3",
});
class User extends sequelize_1.Model {
}
User.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "User",
});
class Todo extends sequelize_1.Model {
}
Todo.init({
    title: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Todo",
});
User.hasMany(Todo, { as: "User", foreignKey: "UserId" });
Todo.belongsTo(User, { as: "User" });
module.exports = {
    sequelize,
    User,
    Todo,
};
