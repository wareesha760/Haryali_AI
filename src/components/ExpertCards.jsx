import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const experts = [
  {
    id: 1,
    name: "ڈاکٹر احمد علی",
    role: "فصلات کے ماہر",
    experience: 15,
    clients: "850+",
    rating: 4.9,
    services: [
      "این ایس بی، ایگری ٹیکن، پیجمان یونیورسٹی",
      "کلب ویژن، مکران کے ماہر",
      "فصلات ٹیک پیکیج",
    ],
    available: "دستیابی: صبح ۹ سے شام ۶",
  },
  {
    id: 2,
    name: "ڈاکٹر فاطمہ خان",
    role: "مویشی پالنے کی ماہر",
    experience: 12,
    clients: "650+",
    rating: 4.8,
    services: [
      "ڈی وی ایم، ایپ لائیڈ جنرل ویٹ",
      "گائے، بھینس، بکری کے ماہر",
      "لاون پالیسی",
    ],
    available: "دستیابی: صبح ۸ سے شام ۷",
  },
];

export default function ExpertCards({ onBookAppointment, appointments = [] }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [form, setForm] = useState({ name: "", datetime: "" });
  const navigate = useNavigate();

  const handleAppointment = (expert) => {
    setSelectedExpert(expert);
    setShowModal(true);
  };

  const submitAppointment = async () => {
    if (!form.name || !form.datetime) {
      alert("براہ کرم تمام فیلڈز پر کریں");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("براہ کرم پہلے لاگ ان کریں");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          expert: selectedExpert.name,
          name: form.name,
          datetime: form.datetime,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create appointment");
      }

      const newAppointment = await response.json();
      console.log("Appointment created:", newAppointment);

      onBookAppointment && onBookAppointment(newAppointment);

      setShowModal(false);
      setForm({ name: "", datetime: "" });
      alert("✅ اپوائنٹمنٹ بک ہو گئی ہے");

      // ✅ Navigate to appointments page
      navigate("/appointments");
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("❌ اپوائنٹمنٹ بک نہیں ہو سکی۔ براہ کرم دوبارہ کوشش کریں");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-40 pb-10 px-6 relative">
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
        >
          <h1 className="text-3xl font-extrabold text-green-800">
            ماہرین زراعت سے مشورہ
          </h1>
        </motion.div>
      </motion.div>

      {/* Glass Card */}
      <motion.div
        className="w-full max-w-5xl p-8 rounded-3xl bg-white/50 backdrop-blur-xl shadow-2xl border border-white/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          {experts.map((exp, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="mb-3">
                <h2 className="text-xl font-bold text-green-700">{exp.name}</h2>
                <p className="text-gray-600">{exp.role}</p>
              </div>

              <div className="flex justify-between bg-green-50 p-3 rounded-md mb-4">
                <div className="text-center">
                  <p className="font-bold text-green-600">{exp.experience}</p>
                  <p className="text-sm text-gray-600">سال تجربہ</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-green-600">{exp.clients}</p>
                  <p className="text-sm text-gray-600">کلائنٹس</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-yellow-500">⭐ {exp.rating}</p>
                  <p className="text-sm text-gray-600">رینکنگ</p>
                </div>
              </div>

              <div className="pr-5 space-y-1 text-gray-800 text-sm mb-4">
                {exp.services.map((s, i) => (
                  <div key={i}>✅ {s}</div>
                ))}
              </div>

              <p className="text-sm text-green-800 font-medium mb-4">
                {exp.available}
              </p>

              <button
                onClick={() => handleAppointment(exp)}
                className="w-full bg-gradient-to-r from-green-400 to-lime-500 text-white px-4 py-2 rounded-md hover:shadow-lg"
              >
                🤝 مشورہ
              </button>
            </motion.div>
          ))}
        </div>

        {/* View Appointments Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() =>
              appointments.length === 0
                ? alert("کوئی اپوائنٹمنٹ نہیں ہے ابھی تک")
                : navigate("/appointments")
            }
            className="bg-gradient-to-r from-green-500 to-lime-500 text-white px-6 py-3 rounded-full shadow-md hover:shadow-xl"
          >
            اپوائنٹمنٹ دیکھیں
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-right p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              اپوائنٹمنٹ بک کریں
            </h2>

            <label className="block mb-2 text-black">نام</label>
            <input
              className="w-full border p-2 mb-4 text-black rounded text-right"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="آپ کا نام"
            />

            <label className="block mb-2 text-black">تاریخ اور وقت</label>
            <input
              className="w-full border p-2 mb-4 text-black rounded text-right"
              type="datetime-local"
              value={form.datetime}
              onChange={(e) =>
                setForm({ ...form, datetime: e.target.value })
              }
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded"
              >
                منسوخ کریں
              </button>
              <button
                onClick={submitAppointment}
                className="flex-1 bg-gradient-to-r from-green-500 to-lime-500 text-white py-2 rounded"
              >
                اپوائنٹمنٹ کریں
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
