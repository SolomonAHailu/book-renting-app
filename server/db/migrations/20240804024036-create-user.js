"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userType: {
        type: Sequelize.ENUM("0", "1", "2"),
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING, //
        unique: true,
      },
      password: {
        type: Sequelize.STRING, //
      },
      confirmPassword: {
        type: Sequelize.STRING, //
      },
      location: {
        type: Sequelize.STRING, //
      },
      phoneNumber: {
        type: Sequelize.STRING, //
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};
