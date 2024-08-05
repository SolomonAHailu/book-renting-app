"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transaction", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users", // Name of the users table
          key: "id",
        },
        onDelete: "CASCADE", // Optional: Adjust the behavior on delete
      },
      rentalId: {
        type: Sequelize.INTEGER,
        references: {
          model: "rentals", // Name of the rentals table
          key: "id",
        },
        onDelete: "CASCADE", // Optional: Adjust the behavior on delete
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      transactionDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transaction");
  },
};
