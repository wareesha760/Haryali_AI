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
const fertilizerRoutes = require("./routes/fertilizer");
const plannerRoutes = require("./routes/planner");

// 🔗 MongoDB Connection Function
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://Haryali-AI:Haryali-AI@haryali-ai-cluster.oomvpqn.mongodb.net/kisaan-bot?retryWrites=true&w=majority&appName=Haryali-AI-cluster';
    
    const connection = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    cachedDb = connection;
    console.log("✅ MongoDB connected");
    return connection;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

// 🧭 Route Usage
app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/tractors", tractorRoutes);
app.use("/api/orders", orderRoutes); // ✅ Use Order Routes
app.use("/api/appointments", appointmentRoutes); // ✅ Use Appointment Routes
app.use("/api/machinery", machineryRoutes); // ✅ Use Machinery Routes
app.use("/api/products", productRoutes); // ✅ Use Product Routes
app.use("/api/fertilizer", fertilizerRoutes); // ✅ Use Fertilizer Routes
app.use("/api/planner", plannerRoutes); // ✅ Use Planner Routes

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Kisaan Bot API is running! 🌾" });
});

// Connect to database before starting server
connectToDatabase()
  .then(() => {
    // 🚪 Start Server (only if not in Vercel)
    if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
      const PORT = process.env.PORT || 5001;
      const server = app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
      });

      // Handle server errors
      server.on('error', (err) => {
        console.error('❌ Server error:', err);
      });
    }
  })
  .catch((err) => {
    console.error('❌ Failed to connect to database:', err);
  });

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

// Export for Vercel serverless
module.exports = app;
