import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function OrdersListPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch orders from backend API
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view your orders");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        console.log("Fetched orders:", data);
        setOrders(data.orders || data); // Handle both response formats
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Delete Order from backend
  const deleteOrder = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to delete orders");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      // Remove from local state
      const updated = orders.filter((order) => order._id !== id);
      setOrders(updated);
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    }
  };

  // Render shop order card
  const renderShopOrder = (order) => (
    <motion.div
      key={order._id}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 150 }}
      className="bg-white/80 p-5 rounded-xl shadow-md border border-white/30"
    >
      <div className="flex items-center gap-4">
        <img
          src={order.image}
          alt={order.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="flex-1 text-right">
          <h3 className="text-green-700 font-bold text-lg mb-2">
            🛒 {order.name}
          </h3>
          <div className="flex items-center justify-end gap-2 mb-2">
            {order.originalPrice && (
              <span className="line-through text-red-500 text-sm">
                {order.originalPrice}
              </span>
            )}
            <span className="text-green-700 font-bold text-lg">
              {order.price}
            </span>
          </div>
          {order.isSale && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md">
              رعایت
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => deleteOrder(order._id)}
        className="mt-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
      >
        ❌ آرڈر حذف کریں
      </button>
    </motion.div>
  );

  // Render tractor order card
  const renderTractorOrder = (order) => (
    <motion.div
      key={order._id}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 150 }}
      className="bg-white/80 p-5 rounded-xl shadow-md border border-white/30 text-right"
    >
      <h3 className="text-green-700 font-bold text-lg mb-2">
        🚜 {order.title}
      </h3>
      {order.catClass && (
        <p className="text-sm text-gray-600">🏷️ CAT CLASS: {order.catClass}</p>
      )}
      <p className="text-sm text-gray-600">📍 مقام: {order.location}</p>
      <p className="text-sm text-gray-600">
        🕐 شروع: {new Date(order.start).toLocaleString("ur-PK")}
      </p>
      <p className="text-sm text-gray-600">
        🕐 ختم: {new Date(order.end).toLocaleString("ur-PK")}
      </p>
      <p className="text-sm text-gray-600">📋 قسم: {order.type}</p>

      <button
        onClick={() => deleteOrder(order._id)}
        className="mt-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
      >
        ❌ آرڈر حذف کریں
      </button>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-green-600">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-40 px-6 relative">
      {/* 🌟 Floating Shapes */}
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

      {/* 🌟 Ribbon */}
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
            📦 آپ کے آرڈرز
          </h1>
        </motion.div>
      </motion.div>

      {/* 🌟 Orders Glass Card */}
      <motion.div
        className="w-full max-w-4xl p-8 rounded-3xl mb-10 bg-white/60 backdrop-blur-xl shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            ابھی تک کوئی آرڈر نہیں کیا گیا۔
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => 
              order.orderType === 'shop' 
                ? renderShopOrder(order) 
                : renderTractorOrder(order)
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
} 