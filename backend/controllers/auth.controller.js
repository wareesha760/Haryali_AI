const User = require("../models/user.model");
const { signupSchema, loginSchema } = require("../validators/auth.validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // You should keep it in .env
// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, phone, password, isTractorOwner, isShopOwner } = value;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already exists / ای میل پہلے سے موجود ہے" });
    }

    const user = new User({ 
      name, 
      email, 
      phone, 
      password, 
      isTractorOwner: isTractorOwner || false,
      isShopOwner: isShopOwner || false
    });
    await user.save();

    // ✅ Create JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.status(201).json({
      message: "Account created successfully / اکاؤنٹ کامیابی سے بنایا گیا",
      token, // ✅ return token here
      user: { 
        id: user._id, 
        name, 
        email, 
        phone,
        isTractorOwner: user.isTractorOwner,
        isShopOwner: user.isShopOwner
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error / سرور میں خرابی ہے", error });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password, isTractorOwner, isShopOwner } = value;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found / صارف نہیں ملا" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password / پاس ورڈ غلط ہے" });
    }

    // Update user roles if provided
    if (isTractorOwner !== undefined || isShopOwner !== undefined) {
      const updateData = {};
      if (isTractorOwner !== undefined) updateData.isTractorOwner = isTractorOwner;
      if (isShopOwner !== undefined) updateData.isShopOwner = isShopOwner;
      
      await User.findByIdAndUpdate(user._id, updateData);
      user.isTractorOwner = isTractorOwner !== undefined ? isTractorOwner : user.isTractorOwner;
      user.isShopOwner = isShopOwner !== undefined ? isShopOwner : user.isShopOwner;
    }

    // Optional: Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).json({
      message: "Login successful / لاگ ان کامیاب",
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        phone: user.phone,
        isTractorOwner: user.isTractorOwner,
        isShopOwner: user.isShopOwner
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error / سرور میں خرابی ہے", error });
  }
};
