const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const Order = require("../models/order.model");

// 🟩 POST / - Create new order
router.post("/", authenticateToken, async (req, res) => {
  try {
    console.log("✅ Creating new order for user:", req.user.id);
    console.log("Order data:", req.body);

    const { orderType, ...orderData } = req.body;

    // Validate order type
    if (!orderType || !['shop', 'tractor'].includes(orderType)) {
      return res.status(400).json({ 
        message: "Order type must be 'shop' or 'tractor'" 
      });
    }

    let newOrder;

    if (orderType === 'shop') {
      // Validate shop order fields
      const { name, image, price } = orderData;
      if (!name || !image || !price) {
        return res.status(400).json({ 
          message: "Shop orders require name, image, and price" 
        });
      }

      newOrder = new Order({
        orderType: 'shop',
        name,
        image,
        price,
        originalPrice: orderData.originalPrice,
        isSale: orderData.isSale || false,
        user: req.user.id
      });
    } else if (orderType === 'tractor') {
      // Validate tractor order fields
      const { title, catClass, location, start, end, type } = orderData;
      if (!title || !location || !start || !end || !type) {
        return res.status(400).json({ 
          message: "Tractor orders require title, location, start, end, and type" 
        });
      }

      newOrder = new Order({
        orderType: 'tractor',
        title,
        catClass,
        location,
        start,
        end,
        type,
        user: req.user.id
      });
    }

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

// 🟩 GET / - Fetch user's orders
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

// 🟩 DELETE /:id - Delete specific order
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    console.log("✅ Deleting order:", req.params.id, "for user:", req.user.id);

    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id // Ensure user can only delete their own orders
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found or unauthorized" });
    }

    console.log("✅ Order deleted successfully");
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting order:", err);
    res.status(500).json({ message: "Server error while deleting order." });
  }
});

module.exports = router;
