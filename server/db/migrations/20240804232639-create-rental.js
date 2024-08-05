"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rental", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: {
          model: "book", // Ensure this matches the table name of your books model
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      renterId: {
        type: Sequelize.INTEGER,
        references: {
          model: "user", // Ensure this matches the table name of your users model
          key: "id",
        },
        allowNull: true, // Optional if renting is not mandatory for the user
      },
      startDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("rented", "returned", "late"),
        defaultValue: "rented",
        allowNull: false,
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
    await queryInterface.dropTable("rental");
  },
};
