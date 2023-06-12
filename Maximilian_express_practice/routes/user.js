const express = require("express");


const userController = require("../controller/user-controller");

const router = express.Router();

router.get("/user", userController.getUser);
router.post("/cart",userController.postAddToCart)
router.get("/cart", userController.getCart);
router.get("/checkout", userController.getCheckout);
router.get("/product-details/:product", userController.getProductDetails);


module.exports = router;
