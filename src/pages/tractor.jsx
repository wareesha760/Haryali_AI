// src/pages/TractorsPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTractor, FaPlus, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Import tractor images
import tractorImage1 from "../assets/john-deere-autonomous-self-driving-tractor-1009701.webp";
import tractorImage2 from "../assets/TRACTOR1.webp";
import tractorImage3 from "../assets/tractor.png";
import tractorImage4 from "../assets/machinery-1754038672917-478705607.webp";
import tractorImage5 from "../assets/agricultural-and-forestry-tyres-harvesters.webp";

const tractorImages = [tractorImage1, tractorImage2, tractorImage3, tractorImage4, tractorImage5];

export default function TractorsPage() {
  const [loading, setLoading] = useState(false);
  const [tractors, setTractors] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch tractors from backend
  const fetchTractors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5001/api/tractors");
      if (!response.ok) {
        throw new Error("Failed to fetch tractors");
      }
      const data = await response.json();
      setTractors(data);
    } catch (err) {
      console.error("Error fetching tractors:", err);
      setError("ٹریکٹر کی معلومات حاصل کرنے میں مسئلہ ہوا");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTractors();
  }, []);

  // Default tractors if no data from backend
  const defaultTractors = [
    {
      title: "65-75 HP ٹریکٹر",
      catClass: "050-0006",
      specs: ["طاقتور زمین ہموار کرنے کی صلاحیت", "4WD آپریشنل", "3 پوائنٹ ہچ فار اٹیچمنٹس"],
      price: 2500,
      location: "لاہور",
      available: true
    },
    {
      title: "35-39 HP ٹریکٹر",
      catClass: "050-0003",
      specs: ["طاقتور زمین ہموار کرنے کی صلاحیت", "3 پوائنٹ ہچ فار اٹیچمنٹس", "4WD آپریشنل"],
      price: 1800,
      location: "فیصل آباد",
      available: true
    },
    {
      title: "40-49 HP ٹریکٹر",
      catClass: "050-0004",
      specs: ["طاقتور زمین ہموار کرنے کی صلاحیت", "4WD آپریشنل", "3 پوائنٹ ہچ فار اٹیچمنٹس"],
      price: 2200,
      location: "ملتان",
      available: true
    },
    {
      title: "50-59 HP ٹریکٹر",
      catClass: "050-0005",
      specs: [
        "اعلیٰ درجے کی ایندھن کی کارکردگی",
        "تیز رفتار ہل چلانے کی صلاحیت",
        "کثیر مقصدی استعمال کے لیے بہترین"
      ],
      price: 2400,
      location: "گوجرانوالہ",
      available: true
    },
  ];

  const displayTractors = tractors.length > 0 ? tractors : defaultTractors;

  const handleRent = async (tractor) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to rent tractors");
      navigate("/login");
      return;
    }

    // Navigate to order page with tractor details
    navigate("/order", { 
      state: { 
        orderType: "tractor",
        tractor: tractor 
      } 
    });
  };

  const getTractorImage = (catClass) => {
    const imageIndex = parseInt(catClass.slice(-1)) % tractorImages.length;
    return tractorImages[imageIndex];
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-40 px-6 relative font-[Noto Nastaliq Urdu] bg-transparent">
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
        className="relative mb-10 text-center"
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
          <h1 className="text-3xl font-extrabold text-green-800 flex items-center gap-3">
            <FaTractor className="text-2xl" />
            کرایہ کی مشینری
          </h1>
        </motion.div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div
          className="mb-8 w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 text-center">
            <div className="text-4xl mb-4">🚜</div>
            <div className="text-xl text-green-600 mb-3 font-bold">ٹریکٹر کی معلومات لوڈ ہو رہی ہیں...</div>
            <div className="text-sm text-gray-600">براہ کرم انتظار کریں</div>
            <div className="mt-4">
              <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          className="mb-8 w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <div className="text-xl text-red-600 mb-4 font-bold">{error}</div>
            <button
              onClick={fetchTractors}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105"
            >
              دوبارہ کوشش کریں
            </button>
          </div>
        </motion.div>
      )}

      {/* Tractors Card Grid */}
      {!loading && !error && (
        <motion.div
          className="w-full max-w-6xl p-8 rounded-3xl bg-white/50 backdrop-blur-xl shadow-2xl border border-white/30 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayTractors.map((tractor, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 relative"
              >
                {tractor.available ? (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-sm px-2 py-1 rounded-md">
                    دستیاب
                  </span>
                ) : (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded-md">
                    غیر دستیاب
                  </span>
                )}
                
                <img
                  src={tractor.image ? `http://localhost:5001${tractor.image}` : getTractorImage(tractor.catClass)}
                  alt={tractor.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />

                <h3 className="text-lg font-bold text-green-700 mb-2">
                  {tractor.title}
                </h3>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="text-green-500" />
                  <span>{tractor.location}</span>
                </div>

                <div className="flex items-center justify-end gap-2 mb-3">
                  <span className="text-green-700 font-bold text-xl">
                    Rs. {tractor.price?.toLocaleString()}/روز
                  </span>
                </div>

                <button
                  onClick={() => handleRent(tractor)}
                  disabled={!tractor.available}
                  className={`w-full py-2 rounded-lg transition-all ${
                    tractor.available
                      ? "bg-gradient-to-r from-green-400 to-lime-500 text-white hover:shadow-lg"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {tractor.available ? "کرایہ کریں" : "دستیاب نہیں"}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Orders Button */}
          <div className="text-center pt-6">
            <motion.button
              onClick={() => navigate("/orders-list")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-400 to-lime-500 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition"
            >
              🚜 ٹریکٹر آرڈرز دیکھیں
            </motion.button>
          </div>

          {/* Add Tractor Button - Only show for tractor owners */}
          {user && user.isTractorOwner && (
            <div className="text-center pt-6">
              <motion.button
                onClick={() => navigate("/add-tractor")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-400 to-lime-500 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-bold flex items-center justify-center gap-3 mx-auto"
              >
                <FaPlus className="text-xl" />
                نیا ٹریکٹر شامل کریں
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}