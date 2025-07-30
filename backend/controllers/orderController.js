const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const Order = require("../models/order.model"); // ✅ Import your Order model

// 🟩 POST / - Create new order
router.post("/", authenticateToken, async (req, res) => {
  try {
    console.log("✅ Creating new order for user:", req.user.id);
    console.log("Order data:", req.body);

    const { title, location, start, end, type } = req.body;

    // Validate required fields
    if (!title || !location || !start || !end || !type) {
      return res.status(400).json({ 
        message: "All fields (title, location, start, end, type) are required" 
      });
    }

    const newOrder = new Order({
      title,
      location,
      start,
      end,
      type,
      user: req.user.id
    });

    const savedOrder = await newOrder.save();
    console.log("✅ Order created successfully:", savedOrder);

    res.status(201).json({ 
      message: "Order created successfully", 
      order: savedOrder 
    });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({ message: "Server error while creating order." });
  }
});

// 🟩 GET / (Not /api/orders, that's handled in server.js)
router.get("/", authenticateToken, async (req, res) => {
  try {
    console.log("✅ Fetching orders for user:", req.user.id);

    const orders = await Order.find({ user: req.user.id });
    res.json({ orders });
  } catch (err) {
    console.error("❌ Error in /api/orders:", err);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
});

module.exports = router; // ✅ Export the router
