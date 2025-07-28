import React, { useState } from "react";
import { motion } from "framer-motion";
import "@fontsource/noto-nastaliq-urdu";

const pricingPlans = {
  normal: [
    {
      name: "معمولی",
      monthlyPrice: "بالکل مفت",
      annualPrice: "۰ روپے/سال",
      features: [
        "AI سے مشورہ پائیں دن میں ۵ بار",
        "اپنے علاقے کا موسم جانیں",
        "زرعی مشینری کرایے پر لیں اور رعایت پائیں",
      ],
      isHighlighted: false,
    },
  ],
  premium: [
    {
      name: "پریمیم",
      monthlyPrice: "۵۰۰ روپے",
      annualPrice: "۶۰۰۰ روپے/سال",
      features: [
        "AI سے دن میں ۱۰ سے ۱۵ بار مشورہ پائیں",
        "اسمارٹ کراپ ایڈوائزر پلان",
        "زرعی مصنوعات پر رعایت",
      ],
      isHighlighted: true,
    },
  ],
};

const PricingCard = ({ plan }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`relative flex flex-col p-6 rounded-2xl shadow-lg border border-gray-200 
      ${
        plan.isHighlighted
          ? "bg-gradient-to-br from-green-400 to-green-300 text-black"
          : "bg-white text-gray-800"
      } 
      w-80 transition-all duration-500`}
  >
    <h2 className="text-2xl font-bold text-center mb-3">{plan.name}</h2>

    <div className="text-center mb-4">
      <p className="text-3xl font-bold">
        {plan.monthlyPrice} <span className="text-sm">/ماہ</span>
      </p>
      <p className="text-base mt-1">{plan.annualPrice}</p>
    </div>

    <button
      className={`w-full py-3 px-5 mb-4 rounded-full font-bold text-lg transition-all duration-300 border ${
        plan.isHighlighted
          ? "bg-white text-green-700 hover:bg-green-200"
          : "bg-transparent text-green-700 border-green-700 hover:bg-green-100"
      }`}
    >
      سبسکرائب کریں
    </button>

    {/* Bullet Points Fixed */}
    <ul className="w-full space-y-3 text-right text-lg">
      {plan.features.map((feature, index) => (
        <li
          key={index}
          className="flex items-center justify-end gap-2 pr-2"
        >
          <span>{feature}</span>
          <span className="text-green-600 text-xl">✔</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("normal");

  return (
    <div className="min-h-screen pt-40 px-6 relative font-[Noto Nastaliq Urdu] flex flex-col items-center">
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
          <h1 className="text-3xl font-extrabold text-green-800">
            ہماری قیمتیں
          </h1>
        </motion.div>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center mb-6 gap-4">
        {["normal", "premium"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`px-8 py-3 rounded-full font-bold text-lg border transition-all duration-300 transform hover:scale-105 ${
              activeTab === type
                ? "bg-green-700 text-white shadow-md"
                : "bg-transparent text-green-700 border-green-700"
            }`}
          >
            {type === "normal" ? "معمولی پیکج" : "پریمیم پیکج"}
          </button>
        ))}
      </div>

      {/* Outer Glass Card - Slightly Larger than Inner */}
      <motion.div
        className="p-8 rounded-3xl bg-white/50 backdrop-blur-xl shadow-2xl border border-white/30 mb-20 flex justify-center"
        style={{ width: "370px" }} // Slightly larger than inner (w-80 = 320px)
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {pricingPlans[activeTab].map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </motion.div>
    </div>
  );
}
