'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Seller, { foreignKey: 'SellerId' })
      Product.hasMany(models.ProductReceipt, { foreignKey: 'ProductId' })      
      Product.hasOne(models.ProductDescription, {foreignKey: 'ProductId'})
      Product.belongsToMany(models.Customer, { through: models.ProductReceipt })
    }

  };
  Product.init({
    productName: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    SellerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};