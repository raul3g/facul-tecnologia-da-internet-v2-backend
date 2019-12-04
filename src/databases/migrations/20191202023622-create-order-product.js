"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.createTable("order_products", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "orders",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.dropTable("order_products");
  }
};
