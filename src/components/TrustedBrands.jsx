import React from "react";
import { motion } from "framer-motion";
import concaveLogo from "../assets/concave.jpg";
import bkkLogo from "../assets/bkk.png";
import agritechLogo from "../assets/agritech.png";
import ecorobotixLogo from "../assets/ecoro.png";

const TrustedBrands = () => {
  const brands = [
    {
      name: "Concave Agri",
      logo: concaveLogo,
      url: "https://concaveagri.com/",
    },
    {
      name: "BKK Agri",
      logo: bkkLogo,
      url: "https://bkk.ag/",
    },
    {
      name: "AgriTech Pakistan",
      logo: agritechLogo,
      url: "https://agritech.com.pk/",
    },
    {
      name: "EcoRobotix",
      logo: ecorobotixLogo,
      url: "https://ecorobotix.com/en-us/",
    },
  ];

  return (
    <section className="relative w-full max-w-7xl bg-white/70 backdrop-blur-lg mb-10 rounded-3xl shadow-2xl border border-white/40 p-6  cursor-pointer">
      {/* Glass Card Container (including heading + strip) */}
      <motion.div
        className="relative w-full max-w-7xl bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 p-6  cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Centered Glowy Heading inside the card */}
        <div className="flex justify-center mb-10">
          <motion.div
            className="relative inline-block"
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
              className="relative px-6 sm:px-10 py-3 bg-white/40 backdrop-blur-xl rounded-full shadow-xl border border-white/30"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-3xl font-extrabold text-green-800">
                ہمارے مستقبل کے ساتھی
              </h2>
            </motion.div>
          </motion.div>
        </div>

                 {/* Scrolling Brand Strip */}
         <div className="overflow-hidden cursor-pointer">
           <motion.div
             className="flex items-center gap-8 min-w-max"
             animate={{ x: ["0%", "-50%"] }}
             transition={{
               duration: 20,
               repeat: Infinity,
               ease: "linear",
             }}
           >
                         {[...brands, ...brands].map((brand, index) => (
               <motion.a
                 key={index}
                 href={brand.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex flex-col items-center justify-center min-w-[200px] h-28 bg-white/80 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 px-4"
                 whileHover={{ y: -5 }}
               >
                                   <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-16 h-16 object-contain mb-2"
                  />
                 <div className="text-sm font-bold text-green-700">
                   {brand.name}
                 </div>
               </motion.a>
             ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TrustedBrands;
