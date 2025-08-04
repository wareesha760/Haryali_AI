// Real agricultural data for fertilizer calculations
const CROP_DATA = {
  wheat: {
    name: "گندم",
    english: "Wheat",
    stages: {
      "seedling": { name: "نشوونما", english: "Seedling" },
      "tillering": { name: "پھوٹ", english: "Tillering" },
      "jointing": { name: "جوڑ", english: "Jointing" },
      "heading": { name: "بالی", english: "Heading" },
      "flowering": { name: "پھول", english: "Flowering" },
      "maturity": { name: "پختگی", english: "Maturity" }
    },
    fertilizer: {
      seedling: { urea: 50, dap: 75, potash: 25 },
      tillering: { urea: 75, dap: 50, potash: 25 },
      jointing: { urea: 100, dap: 25, potash: 50 },
      heading: { urea: 50, dap: 0, potash: 25 },
      flowering: { urea: 25, dap: 0, potash: 0 },
      maturity: { urea: 0, dap: 0, potash: 0 }
    }
  },
  rice: {
    name: "چاول",
    english: "Rice",
    stages: {
      "nursery": { name: "نرسری", english: "Nursery" },
      "transplanting": { name: "نقل", english: "Transplanting" },
      "tillering": { name: "پھوٹ", english: "Tillering" },
      "panicle": { name: "بالی", english: "Panicle" },
      "flowering": { name: "پھول", english: "Flowering" },
      "maturity": { name: "پختگی", english: "Maturity" }
    },
    fertilizer: {
      nursery: { urea: 25, dap: 50, potash: 25 },
      transplanting: { urea: 50, dap: 75, potash: 25 },
      tillering: { urea: 75, dap: 50, potash: 50 },
      panicle: { urea: 100, dap: 25, potash: 75 },
      flowering: { urea: 50, dap: 0, potash: 25 },
      maturity: { urea: 0, dap: 0, potash: 0 }
    }
  },
  cotton: {
    name: "کپاس",
    english: "Cotton",
    stages: {
      "seedling": { name: "نشوونما", english: "Seedling" },
      "vegetative": { name: "نباتی", english: "Vegetative" },
      "flowering": { name: "پھول", english: "Flowering" },
      "boll": { name: "ٹینڈا", english: "Boll" },
      "maturity": { name: "پختگی", english: "Maturity" }
    },
    fertilizer: {
      seedling: { urea: 50, dap: 75, potash: 25 },
      vegetative: { urea: 100, dap: 50, potash: 50 },
      flowering: { urea: 75, dap: 25, potash: 75 },
      boll: { urea: 50, dap: 0, potash: 50 },
      maturity: { urea: 0, dap: 0, potash: 0 }
    }
  },
  maize: {
    name: "مکئی",
    english: "Maize",
    stages: {
      "seedling": { name: "نشوونما", english: "Seedling" },
      "vegetative": { name: "نباتی", english: "Vegetative" },
      "tasseling": { name: "مونچھ", english: "Tasseling" },
      "silking": { name: "ریشم", english: "Silking" },
      "maturity": { name: "پختگی", english: "Maturity" }
    },
    fertilizer: {
      seedling: { urea: 50, dap: 75, potash: 25 },
      vegetative: { urea: 100, dap: 50, potash: 50 },
      tasseling: { urea: 75, dap: 25, potash: 75 },
      silking: { urea: 50, dap: 0, potash: 50 },
      maturity: { urea: 0, dap: 0, potash: 0 }
    }
  },
  sugarcane: {
    name: "گنا",
    english: "Sugarcane",
    stages: {
      "planting": { name: "لگانا", english: "Planting" },
      "tillering": { name: "پھوٹ", english: "Tillering" },
      "grand": { name: "گرینڈ", english: "Grand" },
      "maturity": { name: "پختگی", english: "Maturity" }
    },
    fertilizer: {
      planting: { urea: 75, dap: 100, potash: 50 },
      tillering: { urea: 100, dap: 50, potash: 75 },
      grand: { urea: 125, dap: 25, potash: 100 },
      maturity: { urea: 0, dap: 0, potash: 0 }
    }
  }
};

const SOIL_DATA = {
  clay: {
    name: "چکنی مٹی",
    english: "Clay Soil",
    factor: 1.2 // Requires more fertilizer
  },
  loam: {
    name: "درمیانی مٹی",
    english: "Loam Soil",
    factor: 1.0 // Standard requirement
  },
  sandy: {
    name: "ریتیلی مٹی",
    english: "Sandy Soil",
    factor: 0.8 // Requires less fertilizer
  }
};

const FERTILIZER_TYPES = {
  organic: {
    name: "نامیاتی کھاد",
    english: "Organic Fertilizer",
    factor: 0.7 // Less chemical fertilizer needed
  },
  chemical: {
    name: "کیمیائی کھاد",
    english: "Chemical Fertilizer",
    factor: 1.0 // Standard requirement
  },
  mixed: {
    name: "مخلوط کھاد",
    english: "Mixed Fertilizer",
    factor: 0.85 // Moderate requirement
  }
};

const calculateFertilizer = (req, res) => {
  try {
    const {
      cropType,
      acreArea,
      growthStage,
      soilType,
      fertilizerType,
      previousUse
    } = req.body;

    console.log('📊 Fertilizer calculation request:', {
      cropType,
      acreArea,
      growthStage,
      soilType,
      fertilizerType,
      previousUse
    });

    // Validate inputs
    if (!cropType || !acreArea || !growthStage || !soilType || !fertilizerType) {
      return res.status(400).json({
        error: "تمام فیلڈز ضروری ہیں",
        english: "All fields are required"
      });
    }

    // Check if crop exists
    if (!CROP_DATA[cropType]) {
      return res.status(400).json({
        error: "فصل کی قسم درست نہیں ہے",
        english: "Invalid crop type"
      });
    }

    // Check if growth stage exists for this crop
    if (!CROP_DATA[cropType].stages[growthStage]) {
      return res.status(400).json({
        error: "نشوونما کا مرحلہ درست نہیں ہے",
        english: "Invalid growth stage"
      });
    }

    // Check if soil type exists
    if (!SOIL_DATA[soilType]) {
      return res.status(400).json({
        error: "مٹی کی قسم درست نہیں ہے",
        english: "Invalid soil type"
      });
    }

    // Check if fertilizer type exists
    if (!FERTILIZER_TYPES[fertilizerType]) {
      return res.status(400).json({
        error: "کھاد کی قسم درست نہیں ہے",
        english: "Invalid fertilizer type"
      });
    }

    // Get base fertilizer requirements
    const baseFertilizer = CROP_DATA[cropType].fertilizer[growthStage];
    
    // Apply soil factor
    const soilFactor = SOIL_DATA[soilType].factor;
    
    // Apply fertilizer type factor
    const fertilizerFactor = FERTILIZER_TYPES[fertilizerType].factor;
    
    // Apply previous use factor (if previous use was high, reduce current requirement)
    let previousUseFactor = 1.0;
    if (previousUse === 'high') {
      previousUseFactor = 0.8; // Reduce by 20%
    } else if (previousUse === 'medium') {
      previousUseFactor = 0.9; // Reduce by 10%
    } else if (previousUse === 'low') {
      previousUseFactor = 1.1; // Increase by 10%
    }

    // Calculate final fertilizer requirements per acre
    const ureaPerAcre = Math.round(baseFertilizer.urea * soilFactor * fertilizerFactor * previousUseFactor);
    const dapPerAcre = Math.round(baseFertilizer.dap * soilFactor * fertilizerFactor * previousUseFactor);
    const potashPerAcre = Math.round(baseFertilizer.potash * soilFactor * fertilizerFactor * previousUseFactor);

    // Calculate for total area
    const totalUrea = ureaPerAcre * acreArea;
    const totalDap = dapPerAcre * acreArea;
    const totalPotash = potashPerAcre * acreArea;

    // Calculate cost (approximate prices in PKR per kg)
    const ureaPrice = 250; // PKR per kg
    const dapPrice = 350; // PKR per kg
    const potashPrice = 400; // PKR per kg

    const ureaCost = totalUrea * ureaPrice;
    const dapCost = totalDap * dapPrice;
    const potashCost = totalPotash * potashPrice;
    const totalCost = ureaCost + dapCost + potashCost;

    // Generate recommendations
    const recommendations = generateRecommendations(cropType, growthStage, soilType, fertilizerType);

    const result = {
      crop: {
        name: CROP_DATA[cropType].name,
        english: CROP_DATA[cropType].english
      },
      stage: {
        name: CROP_DATA[cropType].stages[growthStage].name,
        english: CROP_DATA[cropType].stages[growthStage].english
      },
      soil: {
        name: SOIL_DATA[soilType].name,
        english: SOIL_DATA[soilType].english
      },
      fertilizer: {
        name: FERTILIZER_TYPES[fertilizerType].name,
        english: FERTILIZER_TYPES[fertilizerType].english
      },
      requirements: {
        urea: {
          perAcre: ureaPerAcre,
          total: totalUrea,
          unit: "کلوگرام",
          english: "kg"
        },
        dap: {
          perAcre: dapPerAcre,
          total: totalDap,
          unit: "کلوگرام",
          english: "kg"
        },
        potash: {
          perAcre: potashPerAcre,
          total: totalPotash,
          unit: "کلوگرام",
          english: "kg"
        }
      },
      cost: {
        urea: ureaCost,
        dap: dapCost,
        potash: potashCost,
        total: totalCost,
        currency: "روپے",
        english: "PKR"
      },
      recommendations: recommendations,
      area: acreArea,
      factors: {
        soil: soilFactor,
        fertilizer: fertilizerFactor,
        previousUse: previousUseFactor
      }
    };

    console.log('✅ Fertilizer calculation completed:', result);
    res.status(200).json(result);

  } catch (error) {
    console.error('❌ Fertilizer calculation error:', error);
    res.status(500).json({
      error: "حساب میں مسئلہ ہوا",
      english: "Calculation error occurred"
    });
  }
};

const generateRecommendations = (cropType, growthStage, soilType, fertilizerType) => {
  const recommendations = [];

  // General recommendations based on crop
  if (cropType === 'wheat') {
    recommendations.push({
      urdu: "گندم کے لیے نائٹروجن کا استعمال دو حصوں میں کریں",
      english: "Apply nitrogen in two splits for wheat"
    });
  } else if (cropType === 'rice') {
    recommendations.push({
      urdu: "چاول کے لیے پانی کا خیال رکھیں",
      english: "Maintain proper water level for rice"
    });
  } else if (cropType === 'cotton') {
    recommendations.push({
      urdu: "کپاس کے لیے کیڑوں سے بچاؤ ضروری ہے",
      english: "Pest control is essential for cotton"
    });
  }

  // Soil-specific recommendations
  if (soilType === 'clay') {
    recommendations.push({
      urdu: "چکنی مٹی میں کھاد کا استعمال زیادہ کریں",
      english: "Apply more fertilizer in clay soil"
    });
  } else if (soilType === 'sandy') {
    recommendations.push({
      urdu: "ریتیلی مٹی میں کھاد کا استعمال کم کریں",
      english: "Apply less fertilizer in sandy soil"
    });
  }

  // Fertilizer type recommendations
  if (fertilizerType === 'organic') {
    recommendations.push({
      urdu: "نامیاتی کھاد مٹی کی صحت کے لیے بہتر ہے",
      english: "Organic fertilizer is better for soil health"
    });
  }

  // Growth stage recommendations
  if (growthStage === 'seedling') {
    recommendations.push({
      urdu: "نشوونما کے مرحلے میں پانی کا خیال رکھیں",
      english: "Maintain proper moisture during seedling stage"
    });
  } else if (growthStage === 'flowering') {
    recommendations.push({
      urdu: "پھول کے مرحلے میں کھاد کا استعمال کم کریں",
      english: "Reduce fertilizer application during flowering"
    });
  }

  return recommendations;
};

const getCropData = (req, res) => {
  try {
    const crops = Object.keys(CROP_DATA).map(key => ({
      key,
      name: CROP_DATA[key].name,
      english: CROP_DATA[key].english,
      stages: Object.keys(CROP_DATA[key].stages).map(stageKey => ({
        key: stageKey,
        name: CROP_DATA[key].stages[stageKey].name,
        english: CROP_DATA[key].stages[stageKey].english
      }))
    }));

    const soils = Object.keys(SOIL_DATA).map(key => ({
      key,
      name: SOIL_DATA[key].name,
      english: SOIL_DATA[key].english
    }));

    const fertilizers = Object.keys(FERTILIZER_TYPES).map(key => ({
      key,
      name: FERTILIZER_TYPES[key].name,
      english: FERTILIZER_TYPES[key].english
    }));

    res.status(200).json({
      crops,
      soils,
      fertilizers
    });
  } catch (error) {
    console.error('❌ Get crop data error:', error);
    res.status(500).json({
      error: "ڈیٹا حاصل کرنے میں مسئلہ ہوا",
      english: "Error fetching data"
    });
  }
};

module.exports = { calculateFertilizer, getCropData }; 