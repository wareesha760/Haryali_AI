const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Invalid token. User not found." });
        }

        req.user = user; // ✅ attach user to request
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized: Invalid token." });
    }
};

module.exports = authMiddleware;
