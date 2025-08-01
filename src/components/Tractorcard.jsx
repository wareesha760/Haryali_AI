import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTractor, FaMapMarkerAlt, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

// Import tractor images
import tractorImage1 from "../assets/john-deere-autonomous-self-driving-tractor-1009701.webp";
import tractorImage2 from "../assets/TRACTOR1.webp";
import tractorImage3 from "../assets/tractor.png";
import tractorImage4 from "../assets/machinery-1754038672917-478705607.webp";
import tractorImage5 from "../assets/agricultural-and-forestry-tyres-harvesters.webp";

const tractorImages = [tractorImage1, tractorImage2, tractorImage3, tractorImage4, tractorImage5];

export default function TractorCard({ title, catClass, specs, price, location, available, imageUrl }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderLocation, setOrderLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [type, setType] = useState("Self Pickup");
  const navigate = useNavigate();

  // Get a tractor image based on catClass for consistency
  const getTractorImage = () => {
    if (imageUrl) {
      return imageUrl;
    }
    // Use catClass to determine which image to show (for consistency)
    const imageIndex = parseInt(catClass.slice(-1)) % tractorImages.length;
    return tractorImages[imageIndex];
  };

  const handleOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("⚠️ براہ کرم پہلے لاگ ان کریں");
      navigate("/login");
      return;
    }

    // ✅ Validate fields
    if (!orderLocation || !start || !end) {
      toast.error("⚠️ تمام فیلڈز مکمل کریں");
      return;
    }

    const newOrder = {
      orderType: "tractor",
      title,
      catClass,
      location: orderLocation,
      start,
      end,
      type,
      price: price || 0,
    };

    try {
      const response = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.message || "آرڈر محفوظ نہیں ہو سکا");
      }

      toast.success("✅ ایک آرڈر موصول ہو گیا ہے");

      // Reset form and close modal
      setIsModalOpen(false);
      setOrderLocation("");
      setStart("");
      setEnd("");
      setType("Self Pickup");

      // Redirect to orders page
      navigate("/orders-list");
    } catch (err) {
      console.error("Catch block error:", err);
      toast.error("❌ آرڈر بھیجنے میں مسئلہ پیش آیا");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
        {/* Tractor Image and Status */}
        <div className="flex items-center justify-center md:w-32">
          <div className="relative">
            <img
              src={getTractorImage()}
              alt={title}
              className="w-24 h-24 object-cover rounded-lg shadow-md"
            />
            {available ? (
              <FaCheckCircle className="absolute -top-1 -right-1 text-green-500 text-lg" />
            ) : (
              <FaTimesCircle className="absolute -top-1 -right-1 text-red-500 text-lg" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 font-mono">CAT CLASS: {catClass}</p>
              <h3 className="text-xl font-bold text-green-700">{title}</h3>
            </div>
            <div className="text-right">
              {available ? (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <FaCheckCircle className="mr-1" />
                  دستیاب
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <FaTimesCircle className="mr-1" />
                  غیر دستیاب
                </span>
              )}
            </div>
          </div>

          {/* Location and Price */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-green-500" />
              <span>{location || "مقام معلوم نہیں"}</span>
            </div>
            {price && (
              <div className="flex items-center gap-1">
                <FaMoneyBillWave className="text-green-500" />
                <span className="font-semibold">Rs. {price.toLocaleString()}/روز</span>
              </div>
            )}
          </div>

          {/* Specifications */}
          <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
            {specs.map((spec, i) => (
              <li key={i}>{spec}</li>
            ))}
          </ul>

          {/* Action Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={!available}
            className={`mt-3 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
              available
                ? "text-green-600 hover:text-green-700 hover:bg-green-50"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            {available ? "کرایہ اور دستیابی دیکھیں" : "فی الحال دستیاب نہیں"}
          </button>
        </div>
      </div>

      {/* 🚜 Modal for Tractor Order */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg space-y-4 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
            >
              ✖
            </button>

            <h2 className="text-lg font-bold text-green-700">
              {title} - کرایہ کی تفصیل
            </h2>

            {price && (
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>روزانہ کرایہ:</strong> Rs. {price.toLocaleString()}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">کرایہ کی جگہ</label>
              <input
                type="text"
                value={orderLocation}
                onChange={(e) => setOrderLocation(e.target.value)}
                placeholder="آپ کا پتہ درج کریں"
                className="w-full border px-3 py-2 rounded text-sm focus:border-green-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">شروع ہونے کی تاریخ</label>
                <input
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm focus:border-green-500 focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">ختم ہونے کی تاریخ</label>
                <input
                  type="date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">فراہم کرنے کا طریقہ</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border px-3 py-2 rounded text-sm focus:border-green-500 focus:outline-none"
              >
                <option>Self Pickup</option>
                <option>Home Delivery</option>
              </select>
            </div>

            <div className="text-right">
              <button
                onClick={handleOrder}
                className="bg-green-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                آرڈر کریں
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
