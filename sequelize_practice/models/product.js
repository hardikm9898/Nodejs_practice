'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
      Product.belongsTo(models.User, { constraints: true, onDelete: 'CASCADE',foreignKey: "userId" });
      Product.belongsToMany(models.Cart, { through: models.CartItem ,foreignKey: "productId",

      onDelete: null,});
    }
  }
  Product.init({
    title: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    userId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};