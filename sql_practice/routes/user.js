const express = require("express");

const userController = require("../controller/user-controller");

const router = express.Router();

router.get("/user", userController.getUser);
router.get("/product-details/:product", userController.getProductDetails);

module.exports = router;
