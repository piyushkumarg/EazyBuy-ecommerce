const express = require("express");
const { createProduct, fetchAllProducts, fetchProductById, updateProduct, searchProducts } = require("../controller/Products");

const router = express.Router();
//products is already added in base path
router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .get("/search/:query", searchProducts)
  .patch("/:id", updateProduct);

exports.router = router;
