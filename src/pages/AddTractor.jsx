import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTractor, FaUpload, FaUser, FaCog, FaMoneyBillWave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function AddTractor() {
  const [formData, setFormData] = useState({
    ownerName: "",
    machineryName: "",
    model: "",
    perHourCharge: "",
    description: "",
    location: "",
    contactNumber: ""
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("⚠️ براہ کرم پہلے لاگ ان کریں");
      navigate("/login");
      return;
    }

    // Validate required fields
    if (!formData.ownerName || !formData.machineryName || !formData.model || !formData.perHourCharge || !formData.location) {
      toast.error("⚠️ تمام ضروری فیلڈز مکمل کریں");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.ownerName);
      formDataToSend.append("title", formData.machineryName);
      formDataToSend.append("catClass", formData.model);
      formDataToSend.append("price", parseFloat(formData.perHourCharge));
      formDataToSend.append("location", formData.location);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("contactNumber", formData.contactNumber);
      formDataToSend.append("available", "true");
      
      if (image) {
        formDataToSend.append("image", image);
      }

      const response = await fetch("http://localhost:5001/api/tractors", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "ٹریکٹر شامل کرنے میں مسئلہ ہوا");
      }

      toast.success("✅ ٹریکٹر کامیابی سے شامل ہو گیا ہے");
      navigate("/tractor");
    } catch (error) {
      console.error("Error adding tractor:", error);
      toast.error("❌ ٹریکٹر شامل کرنے میں مسئلہ پیش آیا");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-40 p-6 relative text-black">
      {/* Background Floating Shapes */}
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
          transition={{ type: "spring", stiffness: 150 }}
        >
          <h1 className="text-3xl font-extrabold text-green-800 flex items-center gap-3">
            <FaTractor className="text-2xl" />
            نیا ٹریکٹر شامل کریں
          </h1>
        </motion.div>
      </motion.div>

      {/* Form */}
      <motion.div
        className="w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Owner Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaUser className="text-green-600" />
                  مالک کا نام *
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="مالک کا نام درج کریں"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رابطہ نمبر
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="رابطہ نمبر درج کریں"
                />
              </div>
            </div>

            {/* Machinery Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaCog className="text-green-600" />
                  مشینری کا نام *
                </label>
                <input
                  type="text"
                  name="machineryName"
                  value={formData.machineryName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="مشینری کا نام درج کریں"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ماڈل *
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="ماڈل درج کریں"
                />
              </div>
            </div>

            {/* Pricing and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-600" />
                  فی گھنٹہ چارج *
                </label>
                <input
                  type="number"
                  name="perHourCharge"
                  value={formData.perHourCharge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="فی گھنٹہ چارج درج کریں"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مقام *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="مقام درج کریں"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تفصیل
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                placeholder="ٹریکٹر کی تفصیل درج کریں"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaUpload className="text-green-600" />
                تصویر اپلوڈ کریں
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                      <p className="text-sm text-gray-600">تصویر تبدیل کرنے کے لیے دوبارہ کلک کریں</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <FaUpload className="text-4xl text-gray-400 mx-auto" />
                      <p className="text-gray-600">تصویر اپلوڈ کرنے کے لیے کلک کریں</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-green-400 to-lime-500 text-white py-3 px-6 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "شامل ہو رہا ہے..." : "شامل کریں"}
              </motion.button>
              
              <motion.button
                type="button"
                onClick={() => navigate("/tractor")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all duration-300"
              >
                منسوخ کریں
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
} 