const Product = require("../model/product");
const { sucess, error } = require("../responce-Api/responce");

// ? Output: Render Add Product Page

const getAddProductPage = (req, res) => {
  try {
    res
      .status(200)
      .json(sucess("Sucess", { message: "Add Product Page" }, res.statusCode));
  } catch (err) {
    res.status(500).json(error("Somthing Went Wrong", res.statusCode));
  }
};

// ? Input : Title , Price, Description --- Output : Add Product to the Product Database

const addProduct = async (req, res) => {
  // const UserId=req.user.id

  try {
    const { title, price, description } = req.body;

    const product = new Product(title, price, description, req.user._id);

    await product.save();

    res
      .status(201)
      .json(sucess("Sucess", { message: "Product Added" }, res.statusCode));
  } catch (error) {
    res.status(500).json(error("Somthing Went Wrong", res.statusCode));
  }
};

// ? Output : Page with all products

const getProductList = async (req, res) => {
  try {
    const productData = await Product.fetchAll();
    res
      .status(200)
      .json(sucess("Sucess", { product: productData }, res.statusCode));
  } catch (err) {
    res.status(500).json(error("Somthing Went Wrong", res.statusCode));
  }
};

// ? Input: ProductID, EditMode --- Output: Edit Page with Data Populated

const getEditPage = async (req, res) => {
  try {
    const id = req.params.productId;

    const data = await Product.fetchById(id);

    res
      .status(200)
      .json(sucess("Sucess", { message: "Edit Product Page" }, res.statusCode));
  } catch (err) {
    res.status(500).json(error("Somthing Went Wrong", res.statusCode));
  }
};

// ? Input: PID,title,price, description --- Output: UpdateThe Existed Data

const updateProduct = async (req, res) => {
  try {
    const { productId, title, price, description } = req.body;

    const productIdData = await Product.updateProduct(
      productId,
      title,
      price,
      description
    );

    res
      .status(200)
      .json(sucess("Sucess", { message: "Product Updated" }, res.statusCode));
  } catch (erro) {
    // }
    res.status(500).json(error("Somthing Went Wrong", res.statusCode));
  }
};

// ? Input: PID --- Output: Delete The Data

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    await Product.deleteProduct(productId);

    res
      .status(200)
      .json(sucess("Sucess", { message: "Product deleted " }, res.statusCode));
  } catch (err) {
    res.status(500).json(error("Somthing Went Wrong", res.statusCode));
  }
};

module.exports = {
  getEditPage,
  deleteProduct,
  updateProduct,
  getProductList,
  addProduct,
  getAddProductPage,
};
