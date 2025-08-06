import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setSubmitSuccess(true);
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });

      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative w-full max-w-7xl bg-white/70 backdrop-blur-lg  mb-10  rounded-3xl shadow-2xl border border-white/40 p-6  cursor-pointer">
      <motion.div
        className="relative bg-white/70 backdrop-blur-xl rounded-3xl border border-white/30 shadow-xl max-w-6xl mx-auto overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Glowing Heading Inside the Card */}
<div className="flex justify-center mb-10 mt-8">
  <motion.div
    className="relative inline-block"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {/* Glow behind the button-like heading */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-green-400 via-lime-400 to-green-500 rounded-full blur-lg opacity-40"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
    <motion.div
      className="relative px-10 py-3 bg-white/40 backdrop-blur-xl rounded-full shadow-xl border border-white/30"
      whileHover={{ scale: 1.05 }}
    >
      <h2 className="text-3xl font-extrabold text-green-800">
        ہم سے رابطہ کریں
      </h2>
    </motion.div>
  </motion.div>
</div>



        {/* Form */}
        <div className="max-w-3xl mx-auto px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نام *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="آپ کا نام"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 outline-none">
                    ای میل *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="آپ کی ای میل"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 outline-none">
                    فون نمبر
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="آپ کا فون نمبر"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 outline-none">
                    موضوع *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="آپ کا موضوع"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 outline-none">
                  پیغام *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none outline-none "
                  placeholder="آپ کا پیغام یہاں لکھیں..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    بھیج رہا ہے...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    پیغام بھیجیں
                  </>
                )}
              </motion.button>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center"
                >
                  ✅ آپ کا پیغام کامیابی سے بھیج دیا گیا ہے!
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactForm;
