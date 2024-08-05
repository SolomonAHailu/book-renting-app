const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define(
  "rental",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: "book", // Ensure this matches the table name of your books model
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    renterId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user", // Ensure this matches the table name of your users model
        key: "id",
      },
      allowNull: true, // Optional if renting is not mandatory for the user
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("rented", "returned", "late"),
      defaultValue: "rented",
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "rental",
  }
);
