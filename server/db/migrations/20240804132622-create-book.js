"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("book", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bookImage: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      category: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
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
    await queryInterface.dropTable("book");
  },
};
