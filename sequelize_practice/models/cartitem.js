"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.Product, {
        foreignKey: "productId",

        onDelete: null,
      });
      CartItem.belongsTo(models.User, {
        foreignKey: "userId",

        onDelete: null,
      });
    }
  }
  CartItem.init(
    {
      quantity: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
