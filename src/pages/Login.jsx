import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTractor, FaShoppingCart } from "react-icons/fa";
import "@fontsource/noto-nastaliq-urdu";

export default function Login() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    isTractorOwner: false,
    isShopOwner: false,
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password, isTractorOwner, isShopOwner } = form;

    if (!email || !password) {
      alert("ای میل اور پاس ورڈ ضروری ہیں");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          password, 
          isTractorOwner, 
          isShopOwner 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        login(data.user);

        // ✅ Check redirect path if user was trying to go to appointments
        const redirectPath =
          localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      } else {
        alert(data.message || "لاگ ان ناکام");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("سرور سے رابطہ نہیں ہو سکا");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-40 px-6 relative font-[Noto Nastaliq Urdu]">
      {/* Floating Shapes */}
      <motion.div
        className="absolute top-10 left-20 w-28 h-28 bg-green-300 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-36 h-36 bg-lime-400 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      {/* Header */}
      <motion.div
        className="relative mb-10 inline-block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400 via-lime-400 to-green-500 rounded-full blur-lg opacity-40"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.div
          className="relative px-10 py-3 bg-white/40 backdrop-blur-xl rounded-full shadow-xl border border-white/30"
          whileHover={{ scale: 1.05 }}
        >
          <h1 className="text-3xl font-extrabold text-green-800">لاگ ان کریں</h1>
        </motion.div>
      </motion.div>

      {/* Glass Card Container */}
      <motion.div
        className="p-10 rounded-3xl bg-white/50 backdrop-blur-xl shadow-2xl border border-white/30 flex justify-center w-[420px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <form
          onSubmit={handleLogin}
          dir="rtl"
          className="w-full flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="نام"
            value={form.name}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded text-right"
          />

          <input
            type="email"
            name="email"
            placeholder="ای میل"
            value={form.email}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded text-right"
          />

          <input
            type="text"
            name="phone"
            placeholder="فون نمبر"
            value={form.phone}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded text-right"
          />

          <input
            type="password"
            name="password"
            placeholder="پاس ورڈ"
            value={form.password}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded text-right"
          />

          {/* Role Selection */}
          <div className="space-y-3 mt-4">
            <h3 className="text-lg font-bold text-green-700 mb-3">آپ کا رول منتخب کریں:</h3>
            
            <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                name="isTractorOwner"
                checked={form.isTractorOwner}
                onChange={handleInputChange}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaTractor className="text-green-600" />
                ٹریکٹر مالک ہیں
              </label>
            </div>

            <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                name="isShopOwner"
                checked={form.isShopOwner}
                onChange={handleInputChange}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaShoppingCart className="text-green-600" />
                دکان مالک ہیں
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white py-3 rounded-lg hover:shadow-xl transition"
          >
            لاگ ان
          </button>

          <p className="text-center text-sm mt-2">
            نیا صارف؟{" "}
            <span
              className="text-green-700 cursor-pointer font-bold"
              onClick={() => navigate("/signup")}
            >
              سائن اپ کریں
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
