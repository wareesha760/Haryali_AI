const Product = require("../models/product.model");
const multer = require("multer");
const path = require("path");

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "product-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, price, originalPrice, description, category, isSale } = req.body;
        
        // Validate required fields
        if (!name || !price) {
            return res.status(400).json({ 
                message: "تمام ضروری فیلڈز مکمل کریں" 
            });
        }

        // Handle image upload
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/products/${req.file.filename}`;
        }

        const newProduct = new Product({ 
            name, 
            price: parseFloat(price), 
            originalPrice: originalPrice ? parseFloat(originalPrice) : null,
            description,
            category,
            image: imageUrl,
            isSale: isSale === "true"
        });
        
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ message: "Failed to add product", error: err.message });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        if (req.file) {
            updateData.image = `/uploads/products/${req.file.filename}`;
        }
        
        const product = await Product.findByIdAndUpdate(
            id, 
            { ...updateData, updatedAt: Date.now() },
            { new: true }
        );
        
        if (!product) {
            return res.status(404).json({ message: "پروڈکٹ نہیں ملا" });
        }
        
        res.json(product);
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ message: "Failed to update product", error: err.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findByIdAndDelete(id);
        
        if (!product) {
            return res.status(404).json({ message: "پروڈکٹ نہیں ملا" });
        }
        
        res.json({ message: "پروڈکٹ کامیابی سے حذف ہو گیا" });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ message: "Failed to delete product", error: err.message });
    }
};

// Export multer upload for use in routes
exports.upload = upload; 