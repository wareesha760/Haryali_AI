// 📦 Import packages
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// 🌱 Load environment variables
dotenv.config();

// 🚀 Create Express app (this MUST come before app.use)
const app = express();

// 🧩 Middleware
app.use(cors());
app.use(express.json());

// 🔐 JWT Auth Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// 🔄 Route Imports
const authRoutes = require("./routes/auth.routes");
const weatherRoutes = require("./routes/weatherRoute");
const chatRoutes = require("./routes/chatRoutes");
const tractorRoutes = require("./routes/tractor");
const orderRoutes = require("./routes/order");
const appointmentRoutes = require("./routes/appointments");
const machineryRoutes = require("./routes/machinery");
const productRoutes = require("./routes/products");

// 🔗 Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // optional in latest versions
    useUnifiedTopology: true // optional in latest versions
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🧭 Route Usage
app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/tractors", tractorRoutes);
app.use("/api/orders", orderRoutes); // ✅ Use Order Routes
app.use("/api/appointments", appointmentRoutes); // ✅ Use Appointment Routes
app.use("/api/machinery", machineryRoutes); // ✅ Use Machinery Routes
app.use("/api/products", productRoutes); // ✅ Use Product Routes

// Serve uploaded files
app.use("/uploads", express.static("uploads"));


// 🚪 Start Server
const PORT =  5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
