const Machinery = require("../models/machinery.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads/machinery");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "machinery-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
}).single("image");

// Add new machinery
const addMachinery = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { name, model, pricePerHour, description } = req.body;
      const userId = req.user.id;

      if (!name || !model || !pricePerHour) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }

      const machineryData = {
        user: userId,
        name,
        model,
        pricePerHour: parseFloat(pricePerHour),
        description: description || "",
        image: req.file ? `/uploads/machinery/${req.file.filename}` : "",
      };

      const machinery = new Machinery(machineryData);
      await machinery.save();

      res.status(201).json({
        message: "Machinery added successfully",
        machinery,
      });
    });
  } catch (error) {
    console.error("Error adding machinery:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all machinery (available for rental)
const getAllMachinery = async (req, res) => {
  try {
    const machinery = await Machinery.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(machinery);
  } catch (error) {
    console.error("Error fetching machinery:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get user's own machinery
const getUserMachinery = async (req, res) => {
  try {
    const userId = req.user.id;
    // const machinery = await Machinery.find({ user: userId }).sort({ createdAt: -1 });
    const machinery = await Machinery.find().sort({ createdAt: -1 });
    

    res.status(200).json(machinery);
  } catch (error) {
    console.error("Error fetching user machinery:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update machinery availability
const updateMachineryAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;
    const userId = req.user.id;

    const machinery = await Machinery.findOneAndUpdate(
      { _id: id, user: userId },
      { isAvailable },
      { new: true }
    );

    if (!machinery) {
      return res.status(404).json({ message: "Machinery not found" });
    }

    res.status(200).json({
      message: "Machinery availability updated",
      machinery,
    });
  } catch (error) {
    console.error("Error updating machinery:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete machinery
const deleteMachinery = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const machinery = await Machinery.findOneAndDelete({ _id: id, user: userId });

    if (!machinery) {
      return res.status(404).json({ message: "Machinery not found" });
    }

    // Delete associated image if exists
    if (machinery.image) {
      const imagePath = path.join(__dirname, "..", machinery.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      message: "Machinery deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting machinery:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addMachinery,
  getAllMachinery,
  getUserMachinery,
  updateMachineryAvailability,
  deleteMachinery,
}; 