import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function OrderPage() {
  const location = useLocation();
  const newOrders = location.state?.orders || [];

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (newOrders.length > 0) {
      const updatedOrders = [...orders, ...newOrders];
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOrders]);

  // Remove specific order
  const handleRemoveOrder = (indexToRemove) => {
    console.log("Removed called")
    const updated = orders.filter((_, index) => index !== indexToRemove);
    console.log(updated);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-40 px-6 font-[Noto Nastaliq Urdu] bg-transparent relative">
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
          <h1 className="text-3xl font-extrabold text-green-800">آپ کے آرڈرز</h1>
        </motion.div>
      </motion.div>

      {/* Glass Card Wrapper */}
      <motion.div
        className="w-full max-w-6xl p-8 rounded-3xl bg-white/50 backdrop-blur-xl shadow-2xl border border-white/30 mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {orders.length === 0 ? (
            <p className="text-gray-600 col-span-full text-center">
              کوئی آرڈر موجود نہیں ہے۔
            </p>
          ) : (
            orders.map((product, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-bold text-green-700 mb-1">
                  {product.name}
                </h3>
                <span className="text-green-700 font-bold text-xl mb-3">
                  {product.price}
                </span>

                <button
                  onClick={() => handleRemoveOrder(index)}
                  className="mt-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm shadow"
                >
                  آرڈر ختم کریں
                </button>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
