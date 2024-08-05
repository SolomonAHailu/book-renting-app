const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define(
  "book",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "title cannot be null" },
        notEmpty: { msg: "title cannot be empty" },
      },
    },
    bookImage: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: { msg: "bookImage cannot be null" },
        isUrl: { msg: "bookImage must be a url" },
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: { msg: "price cannot be null" },
        isDecimal: { msg: "price must be in decimal" },
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("available", "rented"),
      defaultValue: "available",
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
    modelName: "book",
  }
);
