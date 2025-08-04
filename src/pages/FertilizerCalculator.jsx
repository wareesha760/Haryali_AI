import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FertilizerCalculator() {
  const [cropType, setCropType] = useState("");
  const [acreArea, setAcreArea] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [soilType, setSoilType] = useState("");
  const [fertilizerType, setFertilizerType] = useState("");
  const [previousUse, setPreviousUse] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cropData, setCropData] = useState(null);
  const [fertilizerResult, setFertilizerResult] = useState(null);

  // Fetch crop data on component mount
  useEffect(() => {
    fetchCropData();
  }, []);

  const fetchCropData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/fertilizer/data');
      const data = await response.json();
      setCropData(data);
    } catch (error) {
      console.error('Error fetching crop data:', error);
      toast.error("ڈیٹا حاصل کرنے میں مسئلہ ہوا");
    }
  };

  const handleCalculate = async () => {
    if (!cropType || !acreArea || !growthStage || !soilType || !fertilizerType || !previousUse) {
      toast.error("براہ کرم تمام خانے پُر کریں");
      return;
    }

    if (acreArea <= 0) {
      toast.error("رقبہ صفر سے زیادہ ہونا چاہیے");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/fertilizer/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cropType,
          acreArea: parseFloat(acreArea),
          growthStage,
          soilType,
          fertilizerType,
          previousUse
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setFertilizerResult(result);
        setShowResult(true);
        toast.success("حساب مکمل ہو گیا");
      } else {
        toast.error(result.error || "حساب میں مسئلہ ہوا");
      }
    } catch (error) {
      console.error('Error calculating fertilizer:', error);
      toast.error("حساب میں مسئلہ ہوا");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCropType("");
    setAcreArea("");
    setGrowthStage("");
    setSoilType("");
    setFertilizerType("");
    setPreviousUse("");
    setShowResult(false);
    setFertilizerResult(null);
  };

  // Update growth stages when crop changes
  useEffect(() => {
    setGrowthStage("");
  }, [cropType]);

  return (
    <div className="min-h-screen flex flex-col items-center pt-40 mb-10 justify-center bg-cover bg-center">
      
      {/* ToastContainer for notifications */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={true} pauseOnFocusLoss draggable pauseOnHover />

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

      {/* Content Wrapper */}
      <div className="flex flex-col items-center z-10 p-4">
        {/* Ribbon */}
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
          >
            <h1 className="text-3xl font-extrabold text-green-800">کھاد کیلکولیٹر</h1>
          </motion.div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="w-full max-w-md p-8 rounded-3xl bg-white/60 backdrop-blur-xl shadow-2xl space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Crop Type */}
          <select
            className="w-full border border-green-700 rounded p-2 text-right bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
          >
            <option value="">فصل کی قسم منتخب کریں</option>
            {cropData?.crops?.map((crop) => (
              <option key={crop.key} value={crop.key}>
                {crop.name} ({crop.english})
              </option>
            ))}
          </select>

          {/* Area */}
          <input
            type="number"
            className="w-full border border-green-700 rounded p-2 text-right bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="رقبہ (ایکڑ میں)"
            value={acreArea}
            onChange={(e) => setAcreArea(e.target.value)}
          />

          {/* Growth Stage */}
          <select
            className="w-full border border-green-700 rounded p-2 text-right bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={growthStage}
            onChange={(e) => setGrowthStage(e.target.value)}
            disabled={!cropType}
          >
            <option value="">نشوونما کا مرحلہ منتخب کریں</option>
            {cropType && cropData?.crops?.find(c => c.key === cropType)?.stages?.map((stage) => (
              <option key={stage.key} value={stage.key}>
                {stage.name} ({stage.english})
              </option>
            ))}
          </select>

          {/* Soil Type */}
          <select
            className="w-full border border-green-700 rounded p-2 text-right bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
          >
            <option value="">مٹی کی قسم منتخب کریں</option>
            {cropData?.soils?.map((soil) => (
              <option key={soil.key} value={soil.key}>
                {soil.name} ({soil.english})
              </option>
            ))}
          </select>

          {/* Fertilizer Type */}
          <select
            className="w-full border border-green-700 rounded p-2 text-right bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={fertilizerType}
            onChange={(e) => setFertilizerType(e.target.value)}
          >
            <option value="">کھاد کی قسم منتخب کریں</option>
            {cropData?.fertilizers?.map((fertilizer) => (
              <option key={fertilizer.key} value={fertilizer.key}>
                {fertilizer.name} ({fertilizer.english})
              </option>
            ))}
          </select>

          {/* Previous Use */}
          <select
            className="w-full border border-green-700 rounded p-2 text-right bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={previousUse}
            onChange={(e) => setPreviousUse(e.target.value)}
          >
            <option value="">پچھلی کھاد کا استعمال</option>
            <option value="high">زیادہ</option>
            <option value="medium">درمیانی</option>
            <option value="low">کم</option>
          </select>

          <div className="text-right">
            <motion.button
              onClick={handleCalculate}
              disabled={loading}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-400 to-lime-500 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition disabled:opacity-50"
            >
              {loading ? "حساب کر رہا ہے..." : "حساب کریں"}
            </motion.button>
          </div>
        </motion.div>

        {/* Result Card */}
        {showResult && fertilizerResult && (
          <motion.div
            className="mt-10 w-full max-w-md p-6 rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl text-right space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-green-800 font-bold text-lg">نتیجہ:</h3>
            
            {/* Crop and Stage Info */}
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="font-semibold">فصل: {fertilizerResult.crop.name}</p>
              <p className="font-semibold">مرحلہ: {fertilizerResult.stage.name}</p>
              <p className="font-semibold">مٹی: {fertilizerResult.soil.name}</p>
              <p className="font-semibold">رقبہ: {fertilizerResult.area} ایکڑ</p>
            </div>

            {/* Fertilizer Requirements */}
            <div className="space-y-2">
              <h4 className="font-bold text-green-700">کھاد کی ضرورت:</h4>
              <div className="bg-white p-3 rounded-lg space-y-2">
                <p>• یوریا: {fertilizerResult.requirements.urea.total} {fertilizerResult.requirements.urea.unit}</p>
                <p>• ڈی اے پی: {fertilizerResult.requirements.dap.total} {fertilizerResult.requirements.dap.unit}</p>
                <p>• پوٹاش: {fertilizerResult.requirements.potash.total} {fertilizerResult.requirements.potash.unit}</p>
              </div>
            </div>

            {/* Cost */}
            <div className="space-y-2">
              <h4 className="font-bold text-green-700">لاگت:</h4>
              <div className="bg-white p-3 rounded-lg space-y-2">
                <p>• یوریا: {fertilizerResult.cost.urea.toLocaleString()} {fertilizerResult.cost.currency}</p>
                <p>• ڈی اے پی: {fertilizerResult.cost.dap.toLocaleString()} {fertilizerResult.cost.currency}</p>
                <p>• پوٹاش: {fertilizerResult.cost.potash.toLocaleString()} {fertilizerResult.cost.currency}</p>
                <p className="font-bold border-t pt-2">کل لاگت: {fertilizerResult.cost.total.toLocaleString()} {fertilizerResult.cost.currency}</p>
              </div>
            </div>

            {/* Recommendations */}
            {fertilizerResult.recommendations.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold text-green-700">تجاویز:</h4>
                <div className="bg-yellow-50 p-3 rounded-lg space-y-2">
                  {fertilizerResult.recommendations.map((rec, index) => (
                    <p key={index} className="text-sm">• {rec.urdu}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="text-right">
              <motion.button
                onClick={handleReset}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-400 to-lime-500 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition"
              >
                ری سیٹ کریں
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}