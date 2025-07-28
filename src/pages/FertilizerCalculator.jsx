import { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";

export default function FertilizerCalculator() {
  const [cropType, setCropType] = useState("");
  const [acreArea, setAcreArea] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [soilType, setSoilType] = useState("");
  const [fertilizerType, setFertilizerType] = useState("");
  const [previousUse, setPreviousUse] = useState("");
  const [showResult, setShowResult] = useState(false);

  // Dummy calculation logic for demonstration
  const calculateFertilizer = () => {
    // In a real application, you would have a more complex
    // logic or an API call here based on the inputs.
    // For now, let's just return some fixed values.
    return {
      urea: "3 کلوگرام فی ایکڑ", // 3 kg per acre
      dap: "2.5 کلوگرام فی ایکڑ", // 2.5 kg per acre
      potash: "1.7 کلوگرام فی ایکڑ", // 1.7 kg per acre
    };
  };

  const handleCalculate = () => {
    if (!cropType || !acreArea || !growthStage || !soilType || !fertilizerType || !previousUse) {
      toast.error("براہ کرم تمام خانے پُر کریں"); // Please fill all fields
      return;
    }
    // Perform calculation (dummy for now)
    const result = calculateFertilizer();
    setFertilizerResult(result); // Store result if needed for display
    setShowResult(true);
  };

  const handleReset = () => {
    setCropType("");
    setAcreArea("");
    setGrowthStage("");
    setSoilType("");
    setFertilizerType("");
    setPreviousUse("");
    setShowResult(false);
    // setFertilizerResult(null); // Clear result if storing it
  };

  // State to hold the fertilizer calculation result
  const [fertilizerResult, setFertilizerResult] = useState(null);


  return (
    <div className="min-h-screen flex flex-col items-center pt-40 justify-center bg-cover bg-center">
      
      {/* ToastContainer for notifications */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={true} pauseOnFocusLoss draggable pauseOnHover />

      {/* Floating Shapes - positioned absolutely within the main container */}
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

      {/* Content Wrapper - This will contain the ribbon and the main card.
          It's centered by the parent flex container. */}
      <div className="flex flex-col items-center z-10 p-4"> {/* Added z-10 to ensure content is above floating shapes */}
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
          {[
            { placeholder: "فصل کی قسم", value: cropType, setValue: setCropType },
            { placeholder: "رقبہ (ایکڑ میں)", value: acreArea, setValue: setAcreArea, type: "number" },
            { placeholder: "نشوونما کا مرحلہ", value: growthStage, setValue: setGrowthStage },
            { placeholder: "مٹی کی قسم", value: soilType, setValue: setSoilType },
            { placeholder: "کھاد کی قسم", value: fertilizerType, setValue: setFertilizerType },
            { placeholder: "پچھلی کھاد کا استعمال", value: previousUse, setValue: setPreviousUse },
          ].map((field, i) => (
            <motion.input
              key={i}
              type={field.type || "text"}
              className="w-full border border-green-700 rounded p-2 text-right bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => field.setValue(e.target.value)}
            />
          ))}

          <div className="text-right">
            <motion.button
              onClick={handleCalculate}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-400 to-lime-500 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition"
            >
              حساب کریں
            </motion.button>
          </div>
        </motion.div>

        {/* Result Card */}
        {showResult && (
          <motion.div
            className="mt-10 w-full max-w-md p-6 rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl text-right space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-green-800 font-bold text-lg">نتیجہ:</h3>
            {fertilizerResult && (
              <>
                <p>• یوریا: {fertilizerResult.urea}</p>
                <p>• ڈی اے پی: {fertilizerResult.dap}</p>
                <p>• پوٹاش: {fertilizerResult.potash}</p>
              </>
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