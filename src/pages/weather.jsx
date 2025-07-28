import React from "react";
import { WiDayRain, WiCloudy, WiDaySunny } from "react-icons/wi";
import { FaCloudShowersHeavy } from "react-icons/fa";
import { motion } from "framer-motion";

// ✅ Urdu Date
const getCurrentDate = (offset = 0) => {
  const days = ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعه", "ہفته"];
  const months = [
    "جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون",
    "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر",
  ];
  const today = new Date();
  today.setDate(today.getDate() + offset);
  return `${days[today.getDay()]}، ${today.getDate()} ${months[today.getMonth()]}`;
};

// ✅ Hourly Forecast
const currentHour = new Date().getHours();
const generateHourly = () => {
  const icons = [<FaCloudShowersHeavy color="#3b82f6"/>, <WiCloudy color="#3b82f6"/>];
  return Array.from({ length: 5 }, (_, i) => {
    const hour = (currentHour + i) % 24;
    const label = i === 0 ? "ابھی" : `${hour}:00`;
    return {
      time: label,
      icon: icons[i % icons.length],
      temp: `${19 + i}°`,
      active: i === 0,
    };
  });
};

const weatherData = {
  location: "کسان بوٹ",
  temperature: 29.7,
  condition: "ہلکی ہوا",
  range: "31° / 27°",
  hourly: generateHourly(),
  forecast: [
    {
      period: "دوپہر تا شام",
      time: "12 PM - 6 PM",
      icon: "sunny",
      temp: "High: 31°, Low: 28°",
      note: "ان گھنٹوں میں بارش کا امکان ہے",
    },
    {
      period: "شام تا رات",
      time: "6 PM - 12 AM",
      icon: "cloudy",
      temp: "High: 30°, Low: 27°",
      note: "موسم جزوی طور پر ابر آلود",
    },
    {
      period: "رات تا صبح",
      time: "12 AM - 6 AM",
      icon: "sunny",
      temp: "High: 27°, Low: 26°",
      note: "موسم صاف رہنے کا امکان ہے",
    },
  ],
};

export default function Weather() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-40 p-6 relative">
      
      {/* 🌟 Animated Floating Shapes */}
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

      {/* 🌟 Animated Glass Ribbon */}
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
          transition={{ type: "spring", stiffness: 150 }}
        >
          <h1 className="text-3xl font-extrabold text-green-800">
            موسم کی صورتحال
          </h1>
        </motion.div>
      </motion.div>

      {/* 🌟 Weather Card */}
      <motion.div
        className="w-full max-w-4xl p-8 rounded-3xl bg-white/60 backdrop-blur-xl shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Date & Location */}
        <p className="text-center text-lg mb-4">{getCurrentDate()} | 02:15 PM</p>

        {/* Current Temp */}
        <motion.div
          className="text-center mb-10"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl text-yellow-600 font-bold">{weatherData.temperature}°C</div>
          <div className="mt-2 text-lg">{weatherData.condition}</div>
          <div className="text-sm">{weatherData.range}</div>
        </motion.div>

        {/* Hourly Forecast */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="text-center text-2xl  font-semibold mb-5">
            موجودہ درجۂ حرارت
          </h2>
          <div className="flex justify-center gap-6 overflow-x-auto scrollbar-hide">
            {weatherData.hourly.map((hour, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`rounded-2xl min-w-[110px] py-6 px-5 text-center shadow-md border border-white/30 backdrop-blur-lg ${
                  hour.active ? "bg-white/80 font-bold" : "bg-white/50"
                }`}
              >
                <div className="text-base mb-1">{hour.time}</div>
                <div className="text-4xl mb-2">{hour.icon}</div>
                <div>{hour.temp}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Forecast Cards */}
        <h2 className="text-2xl font-semibold text-center mt-10 mb-5">
          24 گھنٹے کی پیشن گوئی
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weatherData.forecast.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl p-6 shadow-lg bg-white/60 backdrop-blur-xl border border-white/30 text-center"
            >
              <div className="text-lg font-semibold mb-2">{item.period}</div>
              <div className="text-sm mb-1">{item.time}</div>
              <div className="text-4xl mb-2">
                {item.icon === "rain" && <WiDayRain color="#3b82f6" />}
                {item.icon === "cloudy" && <WiCloudy color="#3b82f6"/>}
                {item.icon === "sunny" && <WiDaySunny color="#facc15"/>}
              </div>
              <div className="text-base mb-2">{item.temp}</div>
              <div className="text-xs text-gray-600">{item.note}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
