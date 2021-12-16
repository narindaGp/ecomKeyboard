'use strict';

let seller = require('../data/seller.json')
module.exports = {
  up:  (queryInterface, Sequelize) => {
    seller.forEach(el =>{
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
  return queryInterface.bulkInsert('Sellers', seller, {})
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Sellers', null, {})
  }
};
