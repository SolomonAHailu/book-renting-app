const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define(
  "transaction",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users", // Name of the users table
        key: "id",
      },
      onDelete: "CASCADE", // Optional: Adjust the behavior on delete
    },
    rentalId: {
      type: DataTypes.INTEGER,
      references: {
        model: "rentals", // Name of the rentals table
        key: "id",
      },
      onDelete: "CASCADE", // Optional: Adjust the behavior on delete
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    transactionDate: {
      type: DataTypes.DATE,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "user",
  }
);
