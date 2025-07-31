import React from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ToolsImg from "../assets/Tools.jpeg";
import TwineImg from "../assets/Twine.jpeg";
import WallBagsImg from "../assets/WallBags.jpeg";
import Fertilizer3kgImg from "../assets/Fertilizer3kg.jpeg";
import FertilizerImg from "../assets/Fertilizer.jpeg";
import WaterCanImg from "../assets/WaterCan.jpeg";
import WeederImg from "../assets/Weeder.jpeg";
import SeedingTrayImg from "../assets/SeedingTray.jpeg";
import PlantCoverImg from "../assets/PlantCover.jpeg";
import PestSprayImg from "../assets/PestSpray.jpeg";
import SeedPackImg from "../assets/SeedPack.jpeg";
import MoistureMeterImg from "../assets/MoistureMeter.jpeg";

const products = [
  {
    name: "پریمیم باغبانی ٹول سیٹ",
    image: ToolsImg,
    price: "روپے ۲۸۰۰",
    originalPrice: "روپے ۳۰۰۰",
    isSale: true,
  },
  {
    name: "گارڈن جوٹ ٹوائن",
    image: TwineImg,
    price: "روپے ۱۰۰۰",
    originalPrice: "روپے ۱۱۰۰",
    isSale: true,
  },
  {
    name: "وال ماؤنٹڈ گرو بیگز",
    image: WallBagsImg,
    price: "روپے ۲۰۰۰",
    isSale: false,
  },
  {
    name: "ورمی کمپوسٹ کھاد - ۳ کلو",
    image: Fertilizer3kgImg,
    price: "روپے ۳۰۰",
    isSale: false,
  },
  {
    name: "ورمی کمپوسٹ کھاد - ۵ کلو",
    image: FertilizerImg,
    price: "روپے ۵۰۰",
    isSale: false,
  },
  {
    name: "منی واٹرنگ کین",
    image: WaterCanImg,
    price: "روپے ۴۵۰",
    isSale: false,
  },
  {
    name: "ہینڈ ویڈر ٹول",
    image: WeederImg,
    price: "روپے ۷۰۰",
    originalPrice: "روپے ۹۰۰",
    isSale: true,
  },
  {
    name: "سیڈنگ ٹرے - ۱۲ سیلز",
    image: SeedingTrayImg,
    price: "روپے ۳۵۰",
    isSale: false,
  },
  {
    name: "پودوں کی حفاظت کے کورز",
    image: PlantCoverImg,
    price: "روپے ۵۰۰",
    isSale: false,
  },
  {
    name: "قدرتی کیڑوں سے بچاؤ اسپرے",
    image: PestSprayImg,
    price: "روپے ۷۵۰",
    originalPrice: "روپے ۹۰۰",
    isSale: true,
  },
  {
    name: "سبزیوں کے بیج پیک",
    image: SeedPackImg,
    price: "روپے ۳۰۰",
    isSale: false,
  },
  {
    name: "نمی ماپنے کا آلہ",
    image: MoistureMeterImg,
    price: "روپے ۱۲۰۰",
    originalPrice: "روپے ۱۵۰۰",
    isSale: true,
  },
];

export default function Shop() {
  const navigate = useNavigate();

  const handleBuy = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place orders");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderType: "shop",
          name: product.name,
          image: product.image,
          price: product.price,
          originalPrice: product.originalPrice,
          isSale: product.isSale,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();
      console.log("Order placed successfully:", data);
      alert("آرڈر کامیابی سے رکھا گیا!");
      
      // Navigate to shop orders to show the new order
      navigate("/shop-orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("آرڈر رکھنے میں مسئلہ ہوا۔ براہ کرم دوبارہ کوشش کریں۔");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-40 px-6 relative font-[Noto Nastaliq Urdu] bg-transparent">
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
        className="relative mb-10 text-center"
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
          <h1 className="text-3xl font-extrabold text-green-800">
            زرعی مصنوعات کی دکان
          </h1>
        </motion.div>
      </motion.div>

      {/* Products Card Grid */}
      <motion.div
        className="w-full max-w-6xl p-8 rounded-3xl bg-white/50 backdrop-blur-xl shadow-2xl border border-white/30 mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 relative"
            >
              {product.isSale && (
                <span className="absolute top-2 left-2 bg-green-500 text-white text-sm px-2 py-1 rounded-md">
                  رعایت
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />

              <h3 className="text-lg font-bold text-green-700 mb-2">
                {product.name}
              </h3>

              <div className="flex items-center justify-end gap-2">
                {product.originalPrice && (
                  <span className="line-through text-red-500 text-sm">
                    {product.originalPrice}
                  </span>
                )}
                <span className="text-green-700 font-bold text-xl">
                  {product.price}
                </span>
              </div>

              <button
                onClick={() => handleBuy(product)}
                className="mt-3 w-full bg-gradient-to-r from-green-400 to-lime-500 text-white py-2 rounded-lg hover:shadow-lg"
              >
                خریدیں
              </button>
            </motion.div>
          ))}
        </div>

        {/* ✅ Shop Orders Button */}
        <div className="text-center pt-6">
          <motion.button
            onClick={() => navigate("/shop-orders")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-400 to-lime-500 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition"
          >
            🛒 دکان کے آرڈرز دیکھیں
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
