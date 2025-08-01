const mongoose = require("mongoose");

const tractorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    catClass: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    specs: [{ type: String }],
    available: { type: Boolean, default: true },
    image: { type: String },
    description: { type: String },
    contactNumber: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tractor", tractorSchema);
