import { motion } from "framer-motion";
import { useState } from "react";
import logoImg from "../assets/logo1.png";

function AboutKisaanBot() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 10;
    const y = ((e.clientY - top) / height - 0.5) * 10;
    setTilt({ x, y });
  };

  return (
    <section
      id="about"
      className="relative pt-10 pb-5 overflow-hidden "
    >
        <div className="mt-20">
      {/* Floating Animated Shapes */}
      <motion.div
        className="absolute top-10 left-20 w-24 h-24 bg-green-300 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-32 h-32 bg-lime-400 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Glass Card */}
      <motion.div
        className="relative max-w-6xl mx-auto rounded-3xl p-12 flex flex-col md:flex-row items-center justify-center gap-10 backdrop-blur-lg bg-white/70 shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        }}
      >
        {/* Logo with 3D Tilt */}
        <motion.div
          className="bg-white/80 shadow-xl rounded-2xl p-8 flex items-center justify-center border border-green-100 hover:scale-105 transition-transform duration-300"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
  src={logoImg}
  alt="Haryali ai Logo"
  className="w-64 md:w-80 lg:w-[22rem]"
  animate={{ scale: [1, 1.08, 1] }}
  transition={{ repeat: Infinity, duration: 2 }}
/>
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="text-left max-w-xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Premium Heading with Animated Underline */}
          <div className="relative inline-block mb-4">
            <h2 className="text-6xl font-extrabold text-gray-900 tracking-tight">
              Haryali AI
            </h2>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-600 to-lime-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1 }}
            />
          </div>

          {/* Urdu Subtitle */}
          <h3 className="text-4xl font-semibold bg-gradient-to-r from-green-700 to-lime-400 bg-clip-text text-transparent mb-4">
            سمجھدار کسان، ہرا بھرا میدان
          </h3>

          {/* Paragraph */}
          <p className="text-lg text-gray-700 text-right leading-relaxed">
  ہریالی اے آئی ایک جدید زرعی پلیٹ فارم ہے جو پاکستان کے کسانوں کو مصنوعی ذہانت پر مبنی ٹیکنالوجی اور معلومات فراہم کرتا ہے تاکہ وہ اپنی فصلوں کی پیداوار، معیار اور منافع میں اضافہ کر سکیں۔ یہ پلیٹ فارم موسمی حالات کی پیشن گوئی، زمین کی جانچ، بیجوں کی درست سفارش، زرعی مشینری کے کرائے اور جدید زرعی مشوروں جیسے تمام حل ایک ہی جگہ پر فراہم کرتا ہے۔ ہریالی اے آئی کا مقصد دیہی معیشت کو ڈیجیٹل طور پر مضبوط بنانا، کسانوں کی آمدنی میں اضافہ کرنا اور پائیدار زرعی طریقوں کے ذریعے پاکستان کو خوراک میں خود کفیل بنانا ہے۔
</p>


        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}

export default AboutKisaanBot;



