const Product = require("../models/product");
const { success, error } = require("../responce-Api/responce");

// ? Output: Render Add Product Page

const getAddProductPage = (req, res) => {
  try {
    res
      .status(200)
      .json(
        success("Success", { massage: " Add Product Page" }, res.statusCode)
      );
  } catch (err) {
    res.status(500).json(error("Something Went Wrong", res.statusCode));
  }
};

// ? Input : Title , Price, Description --- Output : Add Product to the Product Database

const addProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;

    await req.user[0].createProduct({ title, price, description });
    res
      .status(201)
      .json(success("Success", { massage: "Product Added" }, res.statusCode));
  } catch (err) {
    res.status(500).json(error("Something Went Wrong", res.statusCode));
  }
};

// ? Output : Page with all products

const getProductList = async (req, res) => {
  try {
    const productData = await Product.findAll();
    res.status(200).json(
      success(
        "Success",
        {
          products: productData,
        },
        res.statusCode
      )
    );
  } catch (err) {
    res.status(500).json(error("Something Went Wrong", res.statusCode));
  }
};

// ? Input: ProductID, EditMode --- Output: Edit Page with Data Populated

const getEditPage = async (req, res) => {
  try {
    const id = req.params.productId;

    const productData = await Product.findAll({ where: { id } });

    if (productData.length === 0) {
      res.status(404).json(error("Id Is Not Found", res.statusCode));
    } else {
      res.status(200).json(success("Success", { product: productData }));
    }
  } catch (err) {
    res.status(500).json(error("Something Went Wrong", res.statusCode));
  }
};

// ? Input: PID,title,price, description --- Output: UpdateThe Existed Data

const updateProduct = async (req, res) => {
  try {
    const { productId, title, price, description } = req.body;

    const productData = await Product.findAll({ where: { id: productId } });
    if (productData.length === 0) {
      res.status(404).json(error("Id Is Not Found", res.statusCode));
    } else {
      await Product.update(
        { title, price, description },
        { where: { id: productId } }
      );

      res
        .status(200)
        .json(success("Success", { massage: "Data Updated" }, res.statusCode));
    }
  } catch (err) {
    res.status(500).json(error("Something Went Wrong", res.statusCode));
  }
};

// ? Input: PID --- Output: Delete The Data

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const productData = await Product.findAll({ where: { id: productId } });

    if (productData.length === 0) {
      res.status(404).json(error("Id Is Not Found", res.statusCode));
    } else {
      await Product.destroy({ where: { id: productId } });

      res.status(202).json(
        success(
          "Success",
          {
            massage: "Data successfully Deleted",
          },
          res.statusCode
        )
      );
    }
  } catch (err) {
    res.status(500).json(error("Something Went Wrong", res.statusCode));
  }
};
module.exports = {
  deleteProduct,
  updateProduct,
  getEditPage,
  getProductList,
  addProduct,
  getAddProductPage,
};
