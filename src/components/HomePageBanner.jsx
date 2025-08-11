import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "@fontsource/noto-nastaliq-urdu";
import fertilizerImg from "../assets/fertilizer.jpg";


const HomePageBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-center items-center min-h-[400px] mb-10 font-[Noto Nastaliq Urdu]">
      {/* Floating Shapes */}
      <motion.div
        className="absolute top-10 left-20 w-32 h-32 bg-green-300 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-40 h-40 bg-lime-400 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      {/* Outer Glass Card */}
      <motion.div
        className="relative w-full max-w-7xl bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 p-6  cursor-pointer"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => navigate("/shop")}
      >
        {/* Inner White Card */}
        <div className="bg-white/90 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between shadow-lg">
          
          {/* ✅ Image on Left */}
          <motion.div
            className="flex-1 flex justify-center items-center mb-6 md:mb-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <img
              src={fertilizerImg} alt="Fertilizer Products"
              className="h-72 md:h-96 object-contain drop-shadow-2xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/400x400/cccccc/000000?text=Image+Not+Found";
              }}
            />
          </motion.div>

          {/* ✅ Text on Right */}
          <div className="text-right z-10 flex-1 pr-6">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800 mb-4">
             زبردست رعایت!
            </h3>

            <motion.p
              className="text-5xl sm:text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-xl mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              25%
            </motion.p>

            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-800 font-semibold mb-3">
              کھاد کی مصنوعات پر خصوصی رعایت حاصل کریں
            </p>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-600">
               ! ابھی خریداری کریں اور اپنی فصلوں کی لاگت کم کریں 
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePageBanner;
