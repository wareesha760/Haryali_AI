import React, { useState, useEffect } from "react";
import { WiDayRain, WiCloudy, WiDaySunny } from "react-icons/wi";
import { FaCloudShowersHeavy } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

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

// ✅ Generate fake hourly forecast based on current temperature
const currentHour = new Date().getHours();
const generateHourly = (baseTemp = 20) => {
  const icons = [<FaCloudShowersHeavy color="#3b82f6" />, <WiCloudy color="#3b82f6" />];
  return Array.from({ length: 5 }, (_, i) => {
    const hour = (currentHour + i) % 24;
    const label = i === 0 ? "ابھی" : `${hour}:00`;
    return {
      time: label,
      icon: icons[i % icons.length],
      temp: `${Math.round(baseTemp + i)}°`,
      active: i === 0,
    };
  });
};

export default function Weather() {
  const [city, setCity] = useState("Lahore");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/api/weather", {
        location: city,
      });
      const data = res.data;

      const weatherData = {
        location: data.location,
        temperature: parseFloat(data.temperature),
        condition: data.description,
        range: "31° / 27°",
        hourly: generateHourly(parseFloat(data.temperature)),
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

      setWeather(weatherData);
    } catch (err) {
      console.error("Error:", err);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center pt-40 p-6 relative text-black">
      {/* Background Floating Shapes */}
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

      {/* Search Bar */}
      <div className="mb-8 flex flex-col items-center">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="شہر درج کریں جیسے Lahore"
          className="p-3 rounded text-black w-64 text-center mb-2"
        />
        <button
          onClick={fetchWeather}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-lg"
        >
          موسم دیکھیں
        </button>
      </div>

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
          transition={{ type: "spring", stiffness: 150 }}
        >
          <h1 className="text-3xl font-extrabold text-green-800">
            موسم کی صورتحال
          </h1>
        </motion.div>
      </motion.div>

      {/* Weather Card */}
      {loading ? (
        <p className="text-xl mt-10">موسم لوڈ ہو رہا ہے...</p>
      ) : weather ? (
        <motion.div
          className="w-full max-w-4xl p-8 rounded-3xl bg-white/60 backdrop-blur-xl shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-center text-lg mb-4">{getCurrentDate()} | {new Date().toLocaleTimeString('ur-PK')}</p>
          <motion.div
            className="text-center mb-10"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl text-yellow-600 font-bold">
              {weather.temperature}°C
            </div>
            <div className="mt-2 text-lg">{weather.condition}</div>
            <div className="text-sm">{weather.range}</div>
          </motion.div>

          {/* Hourly Forecast */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-center text-2xl font-semibold mb-5">
              موجودہ درجۂ حرارت
            </h2>
            <div className="flex justify-center gap-6 overflow-x-auto scrollbar-hide">
              {weather.hourly.map((hour, i) => (
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
            {weather.forecast.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl p-6 shadow-lg bg-white/60 backdrop-blur-xl border border-white/30 text-center"
              >
                <div className="text-lg font-semibold mb-2">{item.period}</div>
                <div className="text-sm mb-1">{item.time}</div>
                <div className="text-4xl mb-2">
                  {item.icon === "rain" && <WiDayRain color="#3b82f6" />}
                  {item.icon === "cloudy" && <WiCloudy color="#3b82f6" />}
                  {item.icon === "sunny" && <WiDaySunny color="#facc15" />}
                </div>
                <div className="text-base mb-2">{item.temp}</div>
                <div className="text-xs text-gray-600">{item.note}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <p className="text-red-500 mt-10">موسم کی معلومات حاصل نہیں ہو سکیں</p>
      )}
    </div>
  );
}

