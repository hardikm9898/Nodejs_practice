const Product = require("../model/user-model");

exports.postAdminproduct = (req, res) => {
  
  const {username,userid}= req.body
  const product = new Product(null,username,userid);
  product.save();
  res.redirect("/user");
};

exports.getAdminProduct = (req, res) => {
  res.render("admin/admin-edit-product", {
    pageTitle: "admin-add-product",
    editmode: false,
    path: "/admin/add-product",
  });
};

exports.getAdminEditProduct = (req, res) => {
  const id = req.params.prodctid;
  const editMode = req.query.edit;
  Product.fetchAll(() => {
    Product.findById(id, (product) => {
      res.render("admin/admin-edit-product", {
        product,
        pageTitle: "admin-edit",
        editmode: editMode,
        path: "admin-edit-product",
      });
    });
  });
};
exports.postAdminEditProduct = (req, res) => {
  const productID = req.body.productid;
  const updateUserName = req.body.username;
  const updateUserId = req.body.userid;

  const product = new Product(productID, updateUserName, updateUserId);

  product.save();

  res.redirect("/admin-product-list");
};

exports.getAdminProductList = (req, res) => {
  Product.fetchAll((product) => {
    res.render("admin/admin-product-list", {
      prods: product,
      pageTitle: "admin-product-list",
      path: "/admin-product-list",
    });
  });
};

exports.postAdminProductList = (req, res) => {
  const id = req.body.productid;

  Product.deletProduct(id);
  res.redirect("/admin-product-list");
};
