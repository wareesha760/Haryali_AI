import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Shop({ title, image, description, url = "" }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const threshold = 10;

  const handleMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * -threshold, y: x * threshold });
  };

  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 150, damping: 12 }}>
      <Link to={url}>
        <div
          className="rounded-2xl shadow-xl bg-white 20  border border-white/30 overflow-hidden transition-all duration-300 cursor-pointer w-80 h-[380px] hover:shadow-2xl"
          onMouseMove={handleMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          {/* Image */}
          <motion.img
            src={image}
            alt={title}
            className="mt-8 w-36 h-36 object-contain block mx-auto"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
          />

          {/* Title */}
          <motion.h3
            className="mt-6 text-2xl font-bold text-black text-center drop-shadow-md"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-base text-bold bg-gradient-to-r from-green-700 to-lime-700 bg-clip-text text-transparent text-center px-6 mt-4 drop-shadow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {description}
          </motion.p>
        </div>
      </Link>
    </motion.div>
  );
}

export default Shop;


