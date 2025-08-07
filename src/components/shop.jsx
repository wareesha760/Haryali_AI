import React, { useState } from "react";
import { motion } from "framer-motion";

function Shop({ title, image, description, url = "", subscription }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const threshold = 10;

  const isSmartPlanner = title.includes("سمارٹ کسان پلانر");
  const isAIExpert = title.includes("اے آئی ماہر سے فوری مشورہ");
  const isExpertAdvice = title.includes("ماہرِ زراعت");
  const isAIVoice = isAIExpert;

  let cardStyle = "";
  if (isSmartPlanner || isAIExpert || isExpertAdvice) {
    cardStyle =
      "bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-500 border-yellow-400 shadow-lg";
  }

  let isDisabled = false;
  let onClick = undefined;

  if (subscription === "mamoli") {
    if (isSmartPlanner || isExpertAdvice || isAIVoice) {
      isDisabled = true;
    }

    if (isAIVoice && subscription === "mamoli") {
  onClick = async (e) => {
    e.preventDefault();

    const msgCount = parseInt(localStorage.getItem("mamoli_voice_messages") || "0", 10);

    if (msgCount >= 5) {
      alert("آپ کی وائس کی حد مکمل ہو چکی ہے۔ پریمیم پلان خریدیں۔");
      return;
    }

    // Send user to voice feature
    localStorage.setItem("mamoli_voice_messages", msgCount + 1);
    window.location.href = url;
  };
}
  }

  if (subscription === "premium") {
    isDisabled = false;
  }

  const handleMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * -threshold, y: x * threshold });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
    >
      {isDisabled ? (
        <div
          className={`rounded-2xl shadow-xl border border-white/70 overflow-hidden transition-all duration-300 w-80 h-[380px] opacity-50 ${cardStyle}`}
        >
          <motion.img
            src={image}
            alt={title}
            className="mt-8 w-36 h-36 object-contain block mx-auto"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
          />
          <motion.h3
            className="mt-6 text-2xl font-bold text-black text-center drop-shadow-md line-through"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-base text-bold bg-gradient-to-r from-green-700 to-lime-700 bg-clip-text text-transparent text-center px-6 mt-4 drop-shadow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {description}
          </motion.p>
        </div>
      ) : (
        <a href={isAIVoice && subscription === "mamoli" ? undefined : url} onClick={onClick}>
          <div
            className={`rounded-2xl shadow-xl border border-white/30 overflow-hidden transition-all duration-300 cursor-pointer w-80 h-[380px] hover:shadow-2xl ${cardStyle}`}
            onMouseMove={handleMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            <motion.img
              src={image}
              alt={title}
              className="mt-8 w-36 h-36 object-contain block mx-auto"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
            />
            <motion.h3
              className="mt-6 text-2xl font-bold text-black text-center drop-shadow-md"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-base text-bold bg-gradient-to-r from-green-700 to-lime-700 bg-clip-text text-transparent text-center px-6 mt-4 drop-shadow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {description}
            </motion.p>
          </div>
        </a>
      )}
    </motion.div>
  );
}

export default Shop;
