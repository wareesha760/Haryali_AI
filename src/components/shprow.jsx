import React from "react";
import Shop from "./shop";   // Importing the Shop component 
import { motion } from "framer-motion";
import expertImg from "../assets/expert.png";
import weatherImg from "../assets/weather1.jpg";
import tractorImg from "../assets/tractor.png";
import calendarImg from "../assets/calender.jpg";
import micImg from "../assets/mic.png";
import calcuImg from "../assets/calcu.jpeg";
import { useAuth } from "../context/AuthContext";

const cardData = [
  { 
    title: "👑اے آئی ماہر سے فوری مشورہ ", 
    image: micImg, // ✅ use imported variable
    description: "فصل لگانے کا وقت، کھاد کی مقدار ہر سوال کا فوری اور قابلِ بھروسا جواب- اپنا سوال بھیجیں اور جدید زرعی رہنمائی حاصل کریں۔", 
    url: "/voice" 
  },
  { 
    title: "موسم کا حال", 
    image: weatherImg, 
    description: "بارش، دھوپ یا ہوا , اپنے کھیت کے موسم کی تازہ ترین معلومات حاصل کریں اور فصل کی منصوبہ بندی میں آگے رہیں ", 
    url: "/weather" 
  },
  { 
    title: "کرایہ مشینری", 
    image: tractorImg, 
    description: "-زرعی مشینری کا کرایہ پر لینا یا دینا اب آسان! ٹریکٹر، ہارویسٹر، اور دیگر آلات صرف ایک کلک کی دوری پر", 
    url: "/tractor" 
  },
  { 
    title: " 👑سمارٹ کسان پلانر", 
    image: calendarImg, 
    description: "ایک ذہین زراعتی فیچر ہے جو کسانوں کو ان کی زمین، موسم، پانی، اور علاقے کے لحاظ سے بہترین فصل کی منصوبہ بندی میں مدد فراہم کرتا ہے۔",
    url:"/planner" 
  },
  { 
    title: "کھاد کیلکولیٹر", 
    image: calcuImg, 
    description: "-زمین کے رقبے، فصل کی قسم، اور مٹی کی ضرورت کے مطابق درست مقدار میں کھاد تجویز کریں", 
    url: "/fertilizer" 
  },
  { 
    title: "👑 ماہرِ زراعت سے مشورہ", 
    image: expertImg, 
    description: "-فصل، بیماری یا کھاد سے متعلق سوال ہے؟ ابھی کال یا میسج پر ماہرین سے رہنمائی حاصل کریں", 
    url: "/advisor" 
  }
];


function ShopRow() {
  const { user } = useAuth();
  const subscription = user?.subscription || null;
  return (
    <div className="relative w-full max-w-7xl bg-white/70 mb-10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 p-6  cursor-pointer">
      {/* 🌟 Outer Glass Card */}
      <motion.div
        className="w-full max-w-9xl max-auto bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/40 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* 🌟 Header */}
        <motion.div
          className="relative mb-10 inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-0 justify-center bg-gradient-to-r from-green-400 via-lime-400 to-green-500 rounded-full blur-lg opacity-40"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <motion.div
            className="relative justify-center px-6 sm:px-10 py-3 bg-white/40 backdrop-blur-xl rounded-full shadow-xl border border-white/30"
            whileHover={{ scale: 1.05 }}
          >
            <h1 className="text-3xl font-extrabold text-green-800">ہماری خدمات</h1>
          </motion.div>
        </motion.div>

        {/* 🌟 Cards inside the glass card */}
        <div className="flex flex-wrap justify-center gap-6 w-full">
          {cardData.map((card, index) => (
            <Shop
              key={index}
              title={card.title}
              image={card.image}
              description={card.description}
              url={card.url}
              subscription={subscription}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default ShopRow;
