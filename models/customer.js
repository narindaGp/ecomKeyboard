'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.ProductReceipt, { foreignKey: 'CustomerId' })
      Customer.belongsToMany(models.Product, { through: models.ProductReceipt })

    }
  };
  Customer.init({
    customerName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(customer, options) {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(customer.password, salt);
        customer.password = hash

      }
    },
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};