'use strict';

let customer = require('../data/customer.json')
module.exports = {
  up: (queryInterface, Sequelize) => {
    customer.forEach(el => {
      el.balance = 0
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Customers', customer, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Customers', null, {})

  }
};
