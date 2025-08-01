const Tractor = require("../models/tractor.model");
const multer = require("multer");
const path = require("path");

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/tractors/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "tractor-" + uniqueSuffix + path.extname(file.originalname));
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

// Get all tractors
exports.getTractors = async (req, res) => {
    try {
        const tractors = await Tractor.find().sort({ createdAt: -1 });
        res.json(tractors);
    } catch (err) {
        console.error("Error fetching tractors:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Add a new tractor
exports.addTractor = async (req, res) => {
    try {
        const { name, title, catClass, price, location, specs, available, description, contactNumber } = req.body;
        
        // Validate required fields
        if (!name || !title || !catClass || !price || !location) {
            return res.status(400).json({ 
                message: "تمام ضروری فیلڈز مکمل کریں" 
            });
        }

        // Handle image upload
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/tractors/${req.file.filename}`;
        }

        const newTractor = new Tractor({ 
            name, 
            title, 
            catClass, 
            price: parseFloat(price), 
            location, 
            specs: specs ? JSON.parse(specs) : [],
            available: available !== undefined ? available === "true" : true,
            image: imageUrl,
            description,
            contactNumber
        });
        
        await newTractor.save();
        res.status(201).json(newTractor);
    } catch (err) {
        console.error("Error adding tractor:", err);
        res.status(500).json({ message: "Failed to add tractor", error: err.message });
    }
};

// Update tractor availability
exports.updateTractorAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { available } = req.body;
        
        const tractor = await Tractor.findByIdAndUpdate(
            id, 
            { available, updatedAt: Date.now() },
            { new: true }
        );
        
        if (!tractor) {
            return res.status(404).json({ message: "ٹریکٹر نہیں ملا" });
        }
        
        res.json(tractor);
    } catch (err) {
        console.error("Error updating tractor:", err);
        res.status(500).json({ message: "Failed to update tractor", error: err.message });
    }
};

// Export multer upload for use in routes
exports.upload = upload;
