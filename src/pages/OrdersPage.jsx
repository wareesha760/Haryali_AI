import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5001/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();

      // ✅ Add this:
      console.log("Fetched data from /api/orders:", data);

      setOrders(data.orders); // assuming backend sends { orders: [...] }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  fetchOrders();
}, []);

  const deleteOrder = (id) => {
    const updated = orders.filter((order) => order._id !== id); // ✅ Use _id
    setOrders(updated);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-40 px-6 relative">
      {/* ✅ Animated Floating Shapes */}
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

      {/* ✅ Ribbon */}
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
            موصول شدہ آرڈرز
          </h1>
        </motion.div>
      </motion.div>

      {/* ✅ Orders Glass Card */}
      <motion.div
        className="w-full max-w-4xl p-8 rounded-3xl bg-white/60 backdrop-blur-xl shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            کوئی آرڈر موجود نہیں۔
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <motion.div
                key={order._id} // ✅ Use MongoDB _id
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="bg-white/80 p-5 rounded-xl shadow-md border border-white/30"
              >
                <h3 className="text-green-700 font-bold text-lg mb-2">
                  {order.title}
                </h3>
                <p className="text-sm text-gray-600">📍 جگہ: {order.location}</p>
                <p className="text-sm text-gray-600">
                  📅 مدت: {order.start} - {order.end}
                </p>
                <p className="text-sm text-gray-600">🚚 طریقہ: {order.type}</p>
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                >
                  آرڈر حذف کریں
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
