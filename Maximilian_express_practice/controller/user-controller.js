const Product = require("../model/user-model");
const Cart=require("../model/cart-model")


exports.postAddToCart=(req,res)=>{
  const id=req.body.productid
  const productPrice=req.body.productPrice
Cart.addProduct(id,productPrice)
res.redirect("/cart")
}

exports.getUser = (req, res) => {
  Product.fetchAll((product) => {
    res.render("user/user", {
      prods: product,
      pageTitle: "user-page",
      path: "/user",
    });
  });
};
exports.getCart = (req, res) => {

Cart.fetchAllCart((cart)=>{
  res.render("user/cart", {
    cart:cart,
    pageTitle: "your cart",
    path: "/cart",

  });
})
};
exports.getCheckout = (req, res) => {
  res.render("user/checkout", {
    pageTitle: "your chekout",
    path: "/checkout",
  });
  // });
};
exports.getProductDetails = (req, res) => {

  const id = req.params.product;

  Product.findById(id, (product) => {
        res.render("user/product-detail", {
      prods: product,
      pageTitle: "Product Detail",
      path: "/product-detail",

    });

  });
};

 
  

