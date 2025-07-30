const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    type: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Link to user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
