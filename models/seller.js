'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seller.hasMany(models.Product, { foreignKey: 'SellerId' })
    }
  };
  Seller.init({
    sellerName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(seller, options) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(seller.password, salt);
        seller.password = hash
      }
    },
    sequelize,
    modelName: 'Seller',
  });
  return Seller;
};