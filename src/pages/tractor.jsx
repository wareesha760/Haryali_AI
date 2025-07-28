// src/pages/TractorsPage.jsx
import TractorList from "../components/TractorList";
import { motion } from "framer-motion";

export default function TractorsPage() {
  return (
    <div className="pt-40 pb-10 px-4 flex flex-col items-center">
      
      {/* 🌟 Same Animated Ribbon as Weather Page */}
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
            کرایہ کی مشینری
          </h1>
        </motion.div>
      </motion.div>

      {/* ✅ Tractor List Below */}
      <TractorList />
    </div>
  );
}
