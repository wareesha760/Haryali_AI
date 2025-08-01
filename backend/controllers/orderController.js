const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const auth = require("../middleware/auth");

// 🚜 POST /api/orders (Create Order)
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderType, title, catClass, location, start, end, type } = req.body;

    // ✅ Basic validation
    if (!orderType || !title || !catClass || !location || !start || !end || !type) {
      return res.status(400).json({ message: "تمام فیلڈز لازمی ہیں" });
    }

    const newOrder = new Order({
      user: userId,
      orderType,
      title,
      catClass,
      location,
      startDate: start,
      endDate: end,
      deliveryType: type,
    });

    await newOrder.save();
    res.status(201).json({ message: "آرڈر کامیابی سے محفوظ ہو گیا" });
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(500).json({ message: "سرور کی خرابی" });
  }
});

module.exports = router;
