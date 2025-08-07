import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SmartCropPlanner() {
  const [cropType, setCropType] = useState("");
  const [acreArea, setAcreArea] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [soilType, setSoilType] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("");
  const [season, setSeason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [planningData, setPlanningData] = useState(null);
  const [planningResult, setPlanningResult] = useState(null);

  // Fetch planning data on component mount
  useEffect(() => {
    fetchPlanningData();
  }, []);

  const fetchPlanningData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/planner/data');
      const data = await response.json();
      setPlanningData(data);
    } catch (error) {
      console.error('Error fetching planning data:', error);
      toast.error("ڈیٹا حاصل کرنے میں مسئلہ ہوا");
    }
  };

  const handleCalculate = async () => {
    if (!cropType || !acreArea || !growthStage || !soilType || !weatherCondition || !season) {
      toast.error("براہ کرم تمام خانے پُر کریں");
      return;
    }

    if (acreArea <= 0) {
      toast.error("رقبہ صفر سے زیادہ ہونا چاہیے");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/planner/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cropType,
          acreArea: parseFloat(acreArea),
          growthStage,
          soilType,
          weatherCondition,
          season,
          startDate: startDate || new Date().toISOString().split('T')[0]
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setPlanningResult(result);
        setShowResult(true);
        toast.success("منصوبہ بندی مکمل ہو گئی");
      } else {
        toast.error(result.error || "حساب میں مسئلہ ہوا");
      }
    } catch (error) {
      console.error('Error calculating planning:', error);
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
    setWeatherCondition("");
    setSeason("");
    setStartDate("");
    setShowResult(false);
    setPlanningResult(null);
  };

  // Update growth stages when crop changes
  useEffect(() => {
    setGrowthStage("");
  }, [cropType]);

  // Update seasons when crop changes
  useEffect(() => {
    setSeason("");
  }, [cropType]);

  return (
    <div className="mb-10 min-h-screen flex flex-col items-center pt-40 justify-center bg-cover bg-center relative overflow-hidden">
      
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
            <h1 className="text-3xl font-extrabold text-green-800">ہوشیار فصل منصوبہ بند</h1>
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
            {planningData?.crops?.map((crop) => (
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
            {cropType && planningData?.crops?.find(c => c.key === cropType)?.stages?.map((stage) => (
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
            {planningData?.soils?.map((soil) => (
              <option key={soil.key} value={soil.key}>
                {soil.name} ({soil.english})
              </option>
            ))}
          </select>

          {/* Weather Condition */}
          <select
            className="w-full border border-green-700 rounded p-2 text-right bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={weatherCondition}
            onChange={(e) => setWeatherCondition(e.target.value)}
          >
            <option value="">موسم کی حالت منتخب کریں</option>
            {planningData?.weatherConditions?.map((weather) => (
              <option key={weather.key} value={weather.key}>
                {weather.name} ({weather.english})
              </option>
            ))}
          </select>

          {/* Season */}
          <select
            className="w-full border border-green-700 rounded p-2 text-right bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            disabled={!cropType}
          >
            <option value="">موسم منتخب کریں</option>
            {cropType && planningData?.crops?.find(c => c.key === cropType)?.seasons?.map((season) => (
              <option key={season.key} value={season.key}>
                {season.name} ({season.english})
              </option>
            ))}
          </select>

          {/* Start Date */}
          <input
            type="date"
            className="w-full border border-green-700 rounded p-2 text-right bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="شروع کی تاریخ"
          />

          <div className="text-right">
            <motion.button
              onClick={handleCalculate}
              disabled={loading}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-400 to-lime-500 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition disabled:opacity-50"
            >
              {loading ? "حساب کر رہا ہے..." : "منصوبہ بندی کریں"}
            </motion.button>
          </div>
        </motion.div>

        {/* Result Card */}
        {showResult && planningResult && (
          <motion.div
            className="mt-10 w-full max-w-md p-6 rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl text-right space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-green-800 font-bold text-lg">نتیجہ:</h3>
            
            {/* Crop and Stage Info */}
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="font-semibold">فصل: {planningResult.crop.name}</p>
              <p className="font-semibold">مرحلہ: {planningResult.stage.name}</p>
              <p className="font-semibold">مٹی: {planningResult.soil.name}</p>
              <p className="font-semibold">موسم: {planningResult.weather.name}</p>
              <p className="font-semibold">رقبہ: {planningResult.area} ایکڑ</p>
              <p className="font-semibold">دورانیہ: {planningResult.stage.duration} دن</p>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <h4 className="font-bold text-green-700">ضروریات:</h4>
              <div className="bg-white p-3 rounded-lg space-y-2">
                <p>• آبپاشی: {planningResult.requirements.irrigation.frequency} بار</p>
                <p>• کیڑے کنٹرول: {planningResult.requirements.pest_control.frequency} بار</p>
                <p>• محنت کے گھنٹے: {planningResult.requirements.labor.hours} گھنٹے</p>
              </div>
            </div>

            {/* Cost */}
            <div className="space-y-2">
              <h4 className="font-bold text-green-700">لاگت:</h4>
              <div className="bg-white p-3 rounded-lg space-y-2">
                <p>• محنت: {planningResult.costs.labor.toLocaleString()} {planningResult.costs.currency}</p>
                <p>• آبپاشی: {planningResult.costs.irrigation.toLocaleString()} {planningResult.costs.currency}</p>
                <p>• کھاد: {planningResult.costs.fertilizer.toLocaleString()} {planningResult.costs.currency}</p>
                <p>• کیڑے کنٹرول: {planningResult.costs.pest_control.toLocaleString()} {planningResult.costs.currency}</p>
                <p className="font-bold border-t pt-2">کل لاگت: {planningResult.costs.total.toLocaleString()} {planningResult.costs.currency}</p>
              </div>
            </div>

            {/* Timeline */}
            {planningResult.timeline && planningResult.timeline.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold text-green-700">وقت بندی:</h4>
                <div className="bg-blue-50 p-3 rounded-lg space-y-2">
                  {planningResult.timeline.slice(0, 3).map((week, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-semibold">ہفتہ {week.week}: {week.date}</p>
                      {week.activities && week.activities.length > 0 && (
                        <p className="text-xs text-gray-600">• {week.activities.join(', ')}</p>
                      )}
                    </div>
                  ))}
                  {planningResult.timeline.length > 3 && (
                    <p className="text-xs text-gray-500">... اور {planningResult.timeline.length - 3} مزید ہفتے</p>
                  )}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {planningResult.recommendations && planningResult.recommendations.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold text-green-700">تجاویز:</h4>
                <div className="bg-yellow-50 p-3 rounded-lg space-y-2">
                  {planningResult.recommendations.map((rec, index) => (
                    <p key={index} className="text-sm">• {rec.advice}</p>
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