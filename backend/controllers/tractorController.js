const Tractor = require("../models/tractor.model");

// Get all tractors
exports.getTractors = async (req, res) => {
    try {
        const tractors = await Tractor.find();
        res.json(tractors);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

// Add a new tractor
exports.addTractor = async (req, res) => {
    try {
        const { name, price, location } = req.body;
        const newTractor = new Tractor({ name, price, location });
        await newTractor.save();
        res.status(201).json(newTractor);
    } catch (err) {
        res.status(500).json({ message: "Failed to add tractor", error: err });
    }
};
