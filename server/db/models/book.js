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
        notNull: { msg: "Title cannot be null" },
        notEmpty: { msg: "Title cannot be empty" },
      },
    },
    bookImage: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: { msg: "Book image cannot be null" },
        isUrl: { msg: "Each book image must be a valid URL" },
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: { msg: "Price cannot be null" },
        isDecimal: { msg: "Price must be a decimal" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ["all"],
      validate: {
        notNull: { msg: "Category cannot be null" },
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      validate: {
        notNull: { msg: "CreatedBy cannot be null" },
        isInt: { msg: "CreatedBy must be an integer" },
      },
    },
    status: {
      type: DataTypes.ENUM("available", "rented"),
      allowNull: false,
      defaultValue: "available",
      validate: {
        notNull: { msg: "Status cannot be null" },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true, // DeletedAt is optional
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "book",
  }
);
