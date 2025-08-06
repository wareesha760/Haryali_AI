import { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SmartPlanner() {
  const [crop, setCrop] = useState("");
  const [soilTypes, setSoilTypes] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [area, setArea] = useState("");
  const [irrigation, setIrrigation] = useState("");
  const [seedQuality, setSeedQuality] = useState("");
  const [fertilizers, setFertilizers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState("");
  const [activeStep, setActiveStep] = useState(null);

  const allSoils = ["چک مٹی", "ریتیلی مٹی", "میدانی مٹی"];
  const allFertilizers = ["یوریا", "ڈی اے پی", "پوٹاش"];

  const planningSteps = [
    { title: "زمین کی تیاری", detail: "زمین کو اچھی طرح ہموار کریں، پرانی جڑیں نکالیں اور کھاد شامل کریں۔" },
    { title: "آبپاشی کا منصوبہ", detail: "فصل کی ضرورت کے مطابق نہری یا ٹیوب ویل نظام بنائیں۔" },
    { title: "بیج کا انتخاب اور بوائی", detail: "معیاری بیج کا انتخاب کریں اور تجویز کردہ مقدار میں بوائی کریں۔" },
    { title: "کھاد اور کیڑوں سے بچاؤ", detail: "یوریا، ڈی اے پی یا پوٹاش کے ساتھ اسپرے شیڈول پر عمل کریں۔" },
    { title: "بچت کی تفصیل", detail: "پیداواری لاگت اور متوقع آمدنی کا جائزہ لے کر بچت طے کریں۔" },
  ];

  const toggleItem = (item, list, setList) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleSubmit = () => {
    if (!crop || !area || !irrigation || !seedQuality || soilTypes.length === 0 || !instruction || !name || !phone || !location || !budget) {
      toast.error("تمام معلومات مکمل کریں");
      return;
    }

    let msg = "کسان کی معلومات:\n\n";
    msg += `نام: ${name}\n`;
    msg += `نمبر: ${phone}\n`;
    msg += `مقام: ${location}\n`;
    msg += `مالی حد: ${budget}\n\n`;

    msg += `فصل: ${crop}\n`;
    msg += `زمین کی قسم: ${soilTypes.join("، ")}\n`;
    msg += `رقبہ: ${area} ایکڑ\n`;
    msg += `آبپاشی: ${irrigation}\n`;
    msg += `بیج کا معیار: ${seedQuality}\n`;
    msg += `کھاد: ${fertilizers.length > 0 ? fertilizers.join("، ") : "کوئی نہیں"}\n`;
    msg += `اضافی ہدایات: ${instruction}\n\n`;

    if (crop === "گندم") {
      msg += `گندم کے لیے مناسب وقت اکتوبر تا نومبر ہے۔\nیوریا اور ڈی اے پی کھاد بہترین نتائج دیتی ہیں۔`;
    } else if (crop === "چاول") {
      msg += `چاول کے لیے پانی کی وافر مقدار ضروری ہے۔\nٹیوب ویل یا نہری نظام فائدہ مند ہو سکتا ہے۔`;
    } else if (crop === "کپاس") {
      msg += `کپاس کے لیے اچھی روشنی اور گرم موسم درکار ہوتا ہے۔\nپوٹاش کھاد کپاس کی پیداوار بڑھا سکتی ہے۔`;
    } else if (crop === "گنا") {
      msg += `گنا کی کاشت کے لیے زیادہ رقبہ اور پانی کا مستقل بندوبست ضروری ہے۔\nمٹی کی زرخیزی اہم کردار ادا کرتی ہے۔`;
    }

    setResult(msg);
  };

  const resetForm = () => {
    setCrop("");
    setSoilTypes([]);
    setInstruction("");
    setArea("");
    setIrrigation("");
    setSeedQuality("");
    setFertilizers([]);
    setName("");
    setLocation("");
    setBudget("");
    setResult("");
    setActiveStep(null);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center pt-20 justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg5.jpg')" }}
    >
      <ToastContainer position="top-center" autoClose={3000} rtl />

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

      <div className="flex flex-col items-center z-10 pt-20 p-4">
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
          <motion.div className="relative px-10 py-3 bg-white/40 backdrop-blur-xl rounded-full shadow-xl border border-white/30">
            <h1 className="text-4xl font-extrabold text-green-800">
              سمارٹ کسان پلانر
            </h1>
          </motion.div>
        </motion.div>

        {/* Main Glass Card */}
        <motion.div
          className="w-full max-w-2xl p-8 rounded-3xl bg-white/60 backdrop-blur-xl shadow-2xl space-y-4 text-right"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            کسان کی معلومات
          </h2>

          {/* Input Fields */}
          {[
            { placeholder: "کسان کا نام", value: name, setter: setName },
            { placeholder: "مقام", value: location, setter: setLocation },
            { placeholder: "مالی حد", value: budget, setter: setBudget },
            { placeholder: "فصل", value: crop, setter: setCrop },
            { placeholder: "رقبہ (ایکڑ)", value: area, setter: setArea },
            { placeholder: "آبپاشی کا نظام", value: irrigation, setter: setIrrigation },
            { placeholder: "بیج کا معیار", value: seedQuality, setter: setSeedQuality },
          ].map((field, i) => (
            <motion.input
              key={i}
              type="text"
              className="w-full border border-green-700 rounded p-2 text-right bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
            />
          ))}

          {/* Soil Type */}
          <div>
            <span className="font-bold block mb-2 text-lg">زمین کی قسم:</span>
            <div className="flex flex-wrap gap-3">
              {allSoils.map((soil) => (
                <label
                  key={soil}
                  className="flex items-center gap-2 bg-white/70 px-3 py-1 rounded-md border shadow-sm"
                >
                  <input
                    type="checkbox"
                    checked={soilTypes.includes(soil)}
                    onChange={() => toggleItem(soil, soilTypes, setSoilTypes)}
                  />
                  {soil}
                </label>
              ))}
            </div>
          </div>

          {/* Fertilizers */}
          <div>
            <span className="font-bold block mb-2 text-lg">کھاد:</span>
            <div className="flex flex-wrap gap-3">
              {allFertilizers.map((f) => (
                <label
                  key={f}
                  className="flex items-center gap-2 bg-white/70 px-3 py-1 rounded-md border shadow-sm"
                >
                  <input
                    type="checkbox"
                    checked={fertilizers.includes(f)}
                    onChange={() => toggleItem(f, fertilizers, setFertilizers)}
                  />
                  {f}
                </label>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <textarea
            className="w-full border border-green-700 rounded p-2 text-right bg-white/70"
            placeholder="اضافی ہدایات"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={handleSubmit}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-400 to-lime-500 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl"
            >
              نتیجہ دیکھیں
            </motion.button>
            {result && (
              <motion.button
                onClick={resetForm}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl"
              >
                ری سیٹ کریں
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Result Card */}
        {result && (
          <motion.div
            className="mt-8 w-full max-w-2xl p-6 rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl text-right space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-green-700 mb-3">
              کسان کی معلومات
            </h2>
            <p className="text-black whitespace-pre-line">{result}</p>

            <h2 className="text-2xl font-bold text-green-700 mt-4 mb-2">
              منصوبہ بندی کے مراحل
            </h2>

            {planningSteps.map((step, i) => (
              <div key={i}>
                <button
                  onClick={() =>
                    setActiveStep(activeStep === i ? null : i)
                  }
                  className="bg-green-200 w-full p-2 rounded-lg mb-2 text-right font-bold"
                >
                  {step.title}
                </button>
                {activeStep === i && (
                  <div className="bg-gray-100 p-2 rounded-lg mb-2">
                    {step.detail}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
