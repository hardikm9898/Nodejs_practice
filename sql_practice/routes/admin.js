const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const router = express.Router();

const adminController = require("../controller/admin-controller");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/admin/product", adminController.addProductPage);

router.get("/admin/products", adminController.getProductList);
router.post("/admin/product", adminController.addProduct);
router.delete("/admin/product", adminController.deleteProduct);

router.put("/admin/product", adminController.updateProduct);

router.get(
  "/admin/product-edit/:prodctid",
  adminController.getAdminEditProduct
);

module.exports = router;
