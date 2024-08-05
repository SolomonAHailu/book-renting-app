"use strict";
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../../config/database");
const AppError = require("../../utils/appError");

module.exports = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM("0", "1", "2"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "userType cannot be null",
        },
        notEmpty: { msg: "userType cannot be empty" },
      },
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING, //
      allowNull: false,
      validate: {
        notNull: {
          msg: "email cannot be null",
        },
        notEmpty: { msg: "email cannot be empty" },
        isEmail: { msg: "Invalid email id" },
      },
    },
    password: {
      type: DataTypes.STRING, //
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be null",
        },
        notEmpty: { msg: "password cannot be empty" },
      },
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL, //

      set(value) {
        if (value == this.password) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hashPassword);
        } else {
          throw new AppError(
            "Password and confirmPassword must be the same",
            400
          );
        }
      },
    },
    location: {
      type: DataTypes.STRING, //
      allowNull: false,
      validate: {
        notNull: {
          msg: "location cannot be null",
        },
        notEmpty: { msg: "location cannot be empty" },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING, //
      allowNull: false,
      validate: {
        notNull: {
          msg: "phoneNumber cannot be null",
        },
        notEmpty: { msg: "phoneNumber cannot be empty" },
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
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
    modelName: "user",
  }
);
