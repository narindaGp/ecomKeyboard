'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductReceipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  };
  ProductReceipt.init({
    ProductId: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER,
    productKey: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductReceipt',
  });
  return ProductReceipt;
};