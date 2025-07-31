const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Common fields
    orderType: { 
      type: String, 
      required: true, 
      enum: ['shop', 'tractor'] 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    
    // Shop order fields
    name: { type: String },
    image: { type: String },
    price: { type: String },
    originalPrice: { type: String },
    isSale: { type: Boolean, default: false },
    
    // Tractor order fields
    title: { type: String },
    catClass: { type: String },
    location: { type: String },
    start: { type: String },
    end: { type: String },
    type: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
