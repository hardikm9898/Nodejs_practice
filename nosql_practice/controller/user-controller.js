const Product = require("../model/product");
const User = require("../model/user-model");
const { error } = require("../responce-Api/responce");

const order = async (req, res) => {
  try {
    if (req.user.cart.items.length === 0) {
      res
        .status(404)
        .json(error("No Any Product Found In Cart", re.statusCode));
    } else {
      const order = req.user.addOrder();

      res.status(200).json(
        success(
          "success",
          {
            message: "your Order successfully Placed",
          },
          res.statusCode
        )
      );

      return order;
    }
  } catch (err) {
    res.status(500).json(error("Something Went to Wrong", res.statusCode));
  }
};
const deleteItemFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    await req.user.deleteItemsFormCart(productId);

    res.status(200).json(
      success(
        "success",
        {
          message: "Product Deleted From Cart",
        },
        res.statusCode
      )
    );
  } catch (err) {
    res.status(500).json(error("Something Went to Wrong", res.statusCode));
  }
};
const getCart = async (req, res) => {
  try {
    const cartDetails = await req.user[0].getCart();

    const products = await cartDetails.getProducts();

    res.status(200).json(success("Success", { products }, res.statusCode));
  } catch (error) {
    res.status(500).json(error("Something Went to Wrong", res.statusCode));
  }
};
const postCart = async (req, res) => {
  try {
    const id = req.body.productId;

    const product = await Product.fetchById(id);

    await req.user.addToCart(product);

    res.status(200).json(
      success(
        "success",
        {
          message: "product added into cart",
        },
        res.statusCode
      )
    );
  } catch (error) {
    res.status(500).json(error("Something Went to Wrong", res.statusCode));
  }
};

module.exports = {
  postCart,
  getCart,
  deleteItemFromCart,
  order,
};
