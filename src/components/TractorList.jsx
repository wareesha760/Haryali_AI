import TractorCard from "./Tractorcard";
import { motion } from "framer-motion";

export default function TractorList({ tractors = [] }) {
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
      title: "40-49 HPتھریشر",
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

  // Use backend data if available, otherwise use default data
  const displayTractors = tractors.length > 0 ? tractors : defaultTractors;

  return (
    <motion.div
      className="w-full max-w-6xl p-10 rounded-3xl bg-white/50 backdrop-blur-xl shadow-2xl border border-white/30 mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Tractor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayTractors.map((tractor, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.03 }} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, delay: i * 0.1 }}
          >
            <TractorCard 
              {...tractor} 
              imageUrl={tractor.image ? `http://localhost:5001${tractor.image}` : null}
            />
          </motion.div>
        ))}
      </div>

      {/* Order Button */}
      <div className="text-center pt-6">
        <motion.button
          onClick={() => (window.location.href = "/orders-list")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-green-400 to-lime-500 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-bold"
        >
          اپنے آرڈر دیکھیں
        </motion.button>
      </div>
    </motion.div>
  );
}