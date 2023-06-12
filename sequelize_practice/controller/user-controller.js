const { success,error } = require("../responce-Api/responce");

const getCart = async (req, res) => {
  try {
    const cartdetails = await req.user[0].getCart();
    const products = await cartdetails.getProducts();
    res.status(200).json(success("Success",{products},res.statusCode));
  } catch (err) {
    res
      .status(500)
      .json(error("Something Went Wrong",res.statusCode));
  }
};
const postCart = async (req, res) => {
  const prodId = req.body.productId;

  await req.user[0].createCartItem({
    productId: prodId,
    userId: req.user[0].id,
  });
  res
    .status(200)
    .json(success("Success",{message: "Product Added Into Cart"},res.statusCode));
};
module.exports = {
  getCart,
  postCart,
};
