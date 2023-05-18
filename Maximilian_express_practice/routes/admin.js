const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const router = express.Router();

const adminController = require("../controller/admin-controller");

app.use(bodyParser.urlencoded({ extended: false }));


router.get("/admin/add-product", adminController.getAdminProduct);
router.get("/admin-product-list", adminController.getAdminProductList);
router.post("/admin-product-list", adminController.postAdminProductList);
router.post("/admin/add-product", adminController.postAdminproduct);

router.post("/admin/product-edit", adminController.postAdminEditProduct);

router.get(
  "/admin/product-edit/:prodctid",
  adminController.getAdminEditProduct
);

module.exports = router;
