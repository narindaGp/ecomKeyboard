'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProductDescription.init({
    type: DataTypes.STRING,
    size: DataTypes.INTEGER,
    requirement: DataTypes.STRING,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductDescription',
  });
  return ProductDescription;
};