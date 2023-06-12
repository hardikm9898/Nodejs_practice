"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {

    static associate(models) {
      Cart.belongsToMany(models.Product, {
        through: models.CartItem,
        foreignKey: "productId",

        onDelete: null,
      });
      Cart.belongsTo(models.User, {
        foreignKey: "userId",

        onDelete: null,
      });
    }
  }
  Cart.init(
    {
      id: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
