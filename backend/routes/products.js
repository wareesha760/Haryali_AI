const express = require("express");
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct, upload } = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", upload.single("image"), addProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router; 