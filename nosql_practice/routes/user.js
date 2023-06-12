const express = require("express");

const userController = require("../controller/user-controller");

const router = express.Router();

router.post("/order", userController.order);

router.post("/cart", userController.postCart);

router.delete("/cart", userController.deleteItemFromCart);

module.exports = router;
