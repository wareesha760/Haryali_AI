import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCrown, FaLeaf } from "react-icons/fa";
import "@fontsource/noto-nastaliq-urdu";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const pricingPlans = {
  mamoli: [
    {
      name: "معمولی پیکج",
      monthlyPrice: "بالکل مفت",
      annualPrice: "۰ روپے/سال",
      features: [
        "AI سے مشورہ پائیں دن میں ۵ بار",
        "اپنے علاقے کا موسم جانیں",
        "زرعی مشینری کرایے پر لیں اور رعایت پائیں",
        "بنیادی زرعی مشورے",
        "موسم کی پیش گوئی",
      ],
      isHighlighted: false,
      icon: FaLeaf,
    },
  ],
  premium: [
    {
      name: "پریمیم پیکج",
      monthlyPrice: "۵۰۰ روپے",
      annualPrice: " روپے/سال 6000",
      features: [
        "AI سے دن میں ۱۰ سے ۱۵ بار مشورہ پائیں",
        "اسمارٹ کراپ ایڈوائزر پلان",
        "زرعی مصنوعات پر رعایت",
        "پیشہ ور زرعی مشیروں سے رابطہ",
        "تفصیلی کراپ پلاننگ",
        "پیشہ ور ویڈیو گائیڈز",
        "۲۴/۷ سپورٹ",
      ],
      isHighlighted: true,
      icon: FaCrown,
    },
  ],
};

const PricingCard = ({ plan, onSubscribe }) => {
  const IconComponent = plan.icon;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative flex flex-col p-6 rounded-2xl shadow-lg border border-gray-200 
        ${
          plan.isHighlighted
            ? "bg-gradient-to-br from-green-400 to-green-300 text-black"
            : "bg-white text-gray-800"
        } 
        w-full transition-all duration-500`}
    >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className={`p-3 rounded-full ${
          plan.isHighlighted 
            ? "bg-white/80 text-green-700" 
            : "bg-green-100 text-green-600"
        }`}>
          <IconComponent className="text-2xl" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-3">{plan.name}</h2>

      <div className="text-center mb-6">
        <p className="text-3xl font-bold">
          {plan.monthlyPrice} <span className="text-sm">/ماہ</span>
        </p>
        <p className="text-base mt-1">{plan.annualPrice}</p>
      </div>

      <button
        className={`w-full py-3 px-5 mb-6 rounded-full font-bold text-lg transition-all duration-300 border ${
          plan.isHighlighted
            ? "bg-white text-green-700 hover:bg-green-200"
            : "bg-transparent text-green-700 border-green-700 hover:bg-green-100"
        }`}
        onClick={onSubscribe}
      >
        سبسکرائب کریں
      </button>

      {/* Bullet Points */}
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
};

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("mamoli");
  const { user, updateSubscription } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async (planKey) => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/auth/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subscription: planKey }),
      });
      const data = await res.json();
      if (res.ok) {
        updateSubscription(planKey);
        if (planKey === "mamoli") {
          navigate("/");
        } else if (planKey === "premium") {
          navigate("/");
        }
      } else {
        alert(data.message || "Subscription failed");
      }
    } catch (err) {
      alert("Subscription failed");
    }
  };

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

      {/* Glass Card with Tabs Inside */}
      <motion.div
        className="w-full max-w-4xl p-8 rounded-3xl bg-white/50 backdrop-blur-xl shadow-2xl border border-white/30 mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Tabs Inside Glass Card */}
        <div className="flex justify-center mb-8 gap-4">
          {[
            { key: "mamoli", label: "معمولی پیکج", icon: FaLeaf },
            { key: "premium", label: "پریمیم پیکج", icon: FaCrown }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-full font-bold text-lg border transition-all duration-300 flex items-center gap-3 ${
                  activeTab === tab.key
                    ? "bg-green-700 text-white shadow-md"
                    : "bg-white/80 text-green-700 border-green-700 hover:bg-green-50"
                }`}
              >
                <IconComponent className="text-xl" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Pricing Card */}
        <div className="flex justify-center">
          {pricingPlans[activeTab].map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              onSubscribe={() => handleSubscribe(activeTab)}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-lg">
            {activeTab === "mamoli" 
              ? "معمولی پیکج آپ کی زرعی ضروریات کے لیے بہترین شروع ہے"
              : "پریمیم پیکج آپ کی زرعی کامیابی کو اگلے درجے تک لے جاتا ہے"
            }
          </p>
        </div>
      </motion.div>
    </div>
  );
}
