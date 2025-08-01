const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const auth = require("../middleware/auth");

// 🚜 POST /api/orders - Create an order (shop or tractor)
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      orderType, // 'shop' or 'tractor'
      name,
      image,
      price,
      originalPrice,
      isSale,
      title,
      catClass,
      location,
      start,
      end,
      type,
    } = req.body;

    if (!orderType || !['shop', 'tractor'].includes(orderType)) {
      return res.status(400).json({ message: "درست آرڈر کی قسم دیں (shop یا tractor)" });
    }

    const baseFields = {
      user: userId,
      orderType,
    };

    // 🛒 Shop order
    if (orderType === "shop") {
      if (!name || !image || !price) {
        return res.status(400).json({ message: "تمام شاپ آرڈر فیلڈز لازمی ہیں" });
      }

      Object.assign(baseFields, {
        name,
        image,
        price,
        originalPrice,
        isSale: isSale || false,
      });
    }

    // 🚜 Tractor order
    if (orderType === "tractor") {
      if (!title || !catClass || !location || !start || !end || !type) {
        return res.status(400).json({ message: "تمام ٹریکٹر آرڈر فیلڈز لازمی ہیں" });
      }

      Object.assign(baseFields, {
        title,
        catClass,
        location,
        start,
        end,
        type,
      });
    }

    const newOrder = new Order(baseFields);
    await newOrder.save();

    res.status(201).json({ message: "آرڈر کامیابی سے محفوظ ہو گیا" });
  } catch (err) {
    console.error("❌ Order creation failed:", err);
    res.status(500).json({ message: "سرور کی خرابی" });
  }
});

// 📦 GET /api/orders - Fetch orders for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Fetching orders failed:", err);
    res.status(500).json({ message: "آرڈرز حاصل کرنے میں خرابی ہوئی" });
  }
});



router.delete("/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "آرڈر نہیں ملا" });
    }

    if (order.user.toString() !== userId) {
      return res.status(403).json({ message: "آپ اس آرڈر کو حذف نہیں کر سکتے" });
    }

    await order.deleteOne();
    res.status(200).json({ message: "آرڈر کامیابی سے حذف ہو گیا" });
  } catch (err) {
    console.error("❌ Deleting order failed:", err);
    res.status(500).json({ message: "سرور کی خرابی" });
  }
});

module.exports = router;
