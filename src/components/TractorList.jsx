import TractorCard from "./Tractorcard";
import { motion } from "framer-motion";

export default function TractorList() {
  const tractors = [
    {
      title: "65-75 HP ٹریکٹر",
      catClass: "050-0006",
      specs: ["طاقتور زمین ہموار کرنے کی صلاحیت", "4WD آپریشنل", "3 پوائنٹ ہچ فار اٹیچمنٹس"]
    },
    {
      title: "35-39 HP ٹریکٹر",
      catClass: "050-0003",
      specs: ["طاقتور زمین ہموار کرنے کی صلاحیت", "3 پوائنٹ ہچ فار اٹیچمنٹس", "4WD آپریشنل"]
    },
    {
      title: "40-49 HP ٹریکٹر",
      catClass: "050-0004",
      specs: ["طاقتور زمین ہموار کرنے کی صلاحیت", "4WD آپریشنل", "3 پوائنٹ ہچ فار اٹیچمنٹس"]
    },
    {
  title: "50-59 HP ٹریکٹر", // 50-59 HP Tractor
  catClass: "050-0005", // Assuming a sequential category class
  specs: [
    "اعلیٰ درجے کی ایندھن کی کارکردگی",
    "تیز رفتار ہل چلانے کی صلاحیت",
    "کثیر مقصدی استعمال کے لیے بہترین" 
  ]
  },
  ];

  return (
    <motion.div
      className="w-full max-w-6xl p-10 rounded-3xl bg-white/50 backdrop-blur-xl shadow-2xl border border-white/30 mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tractors.map((tractor, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 150 }}>
            <TractorCard {...tractor} />
          </motion.div>
        ))}
      </div>

      {/* ✅ Order Button */}
      <div className="text-center pt-6">
        <motion.button
          onClick={() => (window.location.href = "/orders")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-green-400 to-lime-500 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition"
        >
          آرڈر دیکھیں
        </motion.button>
      </div>
    </motion.div>
  );
}