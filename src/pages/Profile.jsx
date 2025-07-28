import React from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "@fontsource/noto-nastaliq-urdu";

const Profile = () => {
  const { user, logout } = useAuth(); // ✅ Get logout function from context
  const navigate = useNavigate();

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen font-[Noto Nastaliq Urdu]">
        <p className="text-xl text-red-600 font-bold">براہ کرم لاگ ان کریں</p>
      </div>
    );

  const handleLogout = () => {
    logout(); // ✅ Clear user from context
    navigate("/login"); // ✅ Redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-32 px-6 relative font-[Noto Nastaliq Urdu]">
      {/* Floating Background Shapes */}
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

      {/* Header Ribbon */}
      <motion.div
        className="relative mb-10 mt-20 inline-block"
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
            آپ کی پروفائل
          </h1>
        </motion.div>
      </motion.div>

      {/* Outer Glass Card */}
      <motion.div
        className="w-full max-w-4xl p-10 rounded-3xl bg-white/40 backdrop-blur-xl shadow-2xl border border-white/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Inner White Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
          {/* Profile Avatar */}
          <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-3xl font-bold shadow-md">
            {user.name.charAt(0)}
          </div>

          {/* Profile Details */}
          <div className="text-right flex-1">
            <h2 className="text-2xl font-bold text-green-700 mb-4">{user.name}</h2>

            <div className="grid grid-cols-2 gap-y-3 text-lg text-gray-700 mb-5">
              <span className="font-semibold">ای میل:</span>
              <span className="text-right">{user.email}</span>

              <span className="font-semibold">فون نمبر:</span>
              <span className="text-right">{user.phone}</span>
            </div>

            {/* ✅ Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-all"
            >
              🔓 لاگ آؤٹ کریں
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
