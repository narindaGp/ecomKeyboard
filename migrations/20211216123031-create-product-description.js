'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductDescriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.INTEGER
      },
      requirement: {
        type: Sequelize.STRING,

      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProductDescriptions');
  }
};