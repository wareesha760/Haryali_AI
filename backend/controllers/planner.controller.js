// Agricultural Planning Calculator - Similar to Fertilizer Calculator
// Real agricultural data for planning calculations

const CROP_PLANNING_DATA = {
  wheat: {
    name: "گندم",
    english: "Wheat",
    seasons: {
      rabi: { name: "ربیع", english: "Rabi" },
      kharif: { name: "خریف", english: "Kharif" }
    },
    stages: {
      "seedling": { name: "نشوونما", english: "Seedling", duration: 15 },
      "tillering": { name: "پھوٹ", english: "Tillering", duration: 30 },
      "jointing": { name: "جوڑ", english: "Jointing", duration: 45 },
      "heading": { name: "بالی", english: "Heading", duration: 60 },
      "flowering": { name: "پھول", english: "Flowering", duration: 75 },
      "maturity": { name: "پختگی", english: "Maturity", duration: 120 }
    },
    tasks: {
      seedling: { irrigation: 3, weeding: 1, pest_control: 1 },
      tillering: { irrigation: 4, fertilization: 2, weeding: 2 },
      jointing: { irrigation: 5, fertilization: 3, pest_control: 2 },
      heading: { irrigation: 4, pest_control: 3, monitoring: 2 },
      flowering: { irrigation: 3, monitoring: 3, preparation: 2 },
      maturity: { harvesting: 5, storage: 3, marketing: 2 }
    }
  },
  rice: {
    name: "چاول",
    english: "Rice",
    seasons: {
      kharif: { name: "خریف", english: "Kharif" }
    },
    stages: {
      "nursery": { name: "نرسری", english: "Nursery", duration: 25 },
      "transplanting": { name: "نقل", english: "Transplanting", duration: 35 },
      "tillering": { name: "پھوٹ", english: "Tillering", duration: 50 },
      "panicle": { name: "بالی", english: "Panicle", duration: 70 },
      "flowering": { name: "پھول", english: "Flowering", duration: 85 },
      "maturity": { name: "پختگی", english: "Maturity", duration: 120 }
    },
    tasks: {
      nursery: { seed_preparation: 2, nursery_management: 3, irrigation: 2 },
      transplanting: { field_preparation: 3, transplanting: 4, irrigation: 2 },
      tillering: { irrigation: 4, fertilization: 3, weeding: 2 },
      panicle: { irrigation: 3, pest_control: 3, monitoring: 2 },
      flowering: { irrigation: 2, monitoring: 3, preparation: 2 },
      maturity: { harvesting: 5, threshing: 3, storage: 2 }
    }
  },
  cotton: {
    name: "کپاس",
    english: "Cotton",
    seasons: {
      kharif: { name: "خریف", english: "Kharif" }
    },
    stages: {
      "seedling": { name: "نشوونما", english: "Seedling", duration: 20 },
      "vegetative": { name: "نباتی", english: "Vegetative", duration: 45 },
      "flowering": { name: "پھول", english: "Flowering", duration: 70 },
      "boll": { name: "ٹینڈا", english: "Boll", duration: 90 },
      "maturity": { name: "پختگی", english: "Maturity", duration: 150 }
    },
    tasks: {
      seedling: { irrigation: 3, weeding: 2, pest_control: 1 },
      vegetative: { irrigation: 4, fertilization: 3, pruning: 2 },
      flowering: { irrigation: 3, pest_control: 4, monitoring: 2 },
      boll: { irrigation: 2, pest_control: 3, monitoring: 3 },
      maturity: { harvesting: 6, ginning: 4, marketing: 3 }
    }
  }
};

const SOIL_WORK_DATA = {
  clay: {
    name: "چکنی مٹی",
    english: "Clay Soil",
    preparation_time: 1.5, // More time needed
    irrigation_frequency: 1.2 // More irrigation needed
  },
  loam: {
    name: "درمیانی مٹی",
    english: "Loam Soil",
    preparation_time: 1.0, // Standard time
    irrigation_frequency: 1.0 // Standard irrigation
  },
  sandy: {
    name: "ریتیلی مٹی",
    english: "Sandy Soil",
    preparation_time: 0.8, // Less time needed
    irrigation_frequency: 1.5 // More irrigation needed
  }
};

const WEATHER_CONDITIONS = {
  dry: {
    name: "خشک",
    english: "Dry",
    irrigation_factor: 1.5, // More irrigation needed
    pest_control_factor: 1.2 // More pest control needed
  },
  normal: {
    name: "معمولی",
    english: "Normal",
    irrigation_factor: 1.0, // Standard requirements
    pest_control_factor: 1.0 // Standard requirements
  },
  humid: {
    name: "نم",
    english: "Humid",
    irrigation_factor: 0.8, // Less irrigation needed
    pest_control_factor: 1.3 // More pest control needed
  }
};

const calculatePlanning = (req, res) => {
  try {
    const {
      cropType,
      acreArea,
      growthStage,
      soilType,
      weatherCondition,
      season,
      startDate
    } = req.body;

    console.log('📊 Planning calculation request:', {
      cropType,
      acreArea,
      growthStage,
      soilType,
      weatherCondition,
      season,
      startDate
    });

    // Validate inputs
    if (!cropType || !acreArea || !growthStage || !soilType || !weatherCondition || !season) {
      return res.status(400).json({
        error: "تمام فیلڈز ضروری ہیں",
        english: "All fields are required"
      });
    }

    // Check if crop exists
    if (!CROP_PLANNING_DATA[cropType]) {
      return res.status(400).json({
        error: "فصل کی قسم درست نہیں ہے",
        english: "Invalid crop type"
      });
    }

    // Check if growth stage exists for this crop
    if (!CROP_PLANNING_DATA[cropType].stages[growthStage]) {
      return res.status(400).json({
        error: "نشوونما کا مرحلہ درست نہیں ہے",
        english: "Invalid growth stage"
      });
    }

    // Check if soil type exists
    if (!SOIL_WORK_DATA[soilType]) {
      return res.status(400).json({
        error: "مٹی کی قسم درست نہیں ہے",
        english: "Invalid soil type"
      });
    }

    // Check if weather condition exists
    if (!WEATHER_CONDITIONS[weatherCondition]) {
      return res.status(400).json({
        error: "موسم کی حالت درست نہیں ہے",
        english: "Invalid weather condition"
      });
    }

    // Get base planning data
    const cropData = CROP_PLANNING_DATA[cropType];
    const stageData = cropData.stages[growthStage];
    const taskData = cropData.tasks[growthStage];
    const soilData = SOIL_WORK_DATA[soilType];
    const weatherData = WEATHER_CONDITIONS[weatherCondition];

    // Calculate planning requirements
    const baseDuration = stageData.duration;
    const soilFactor = soilData.preparation_time;
    const weatherFactor = weatherData.irrigation_factor;
    
    // Calculate adjusted requirements
    const adjustedDuration = Math.round(baseDuration * soilFactor);
    const irrigationFrequency = Math.round((taskData.irrigation || 0) * weatherFactor * soilData.irrigation_frequency);
    const pestControlFrequency = Math.round((taskData.pest_control || 0) * weatherData.pest_control_factor);
    
    // Calculate labor requirements (hours per acre)
    const laborHours = {
      irrigation: irrigationFrequency * 2, // 2 hours per irrigation
      fertilization: (taskData.fertilization || 0) * 3, // 3 hours per fertilization
      weeding: (taskData.weeding || 0) * 4, // 4 hours per weeding
      pest_control: pestControlFrequency * 2, // 2 hours per pest control
      monitoring: (taskData.monitoring || 0) * 1, // 1 hour per monitoring
      harvesting: (taskData.harvesting || 0) * 6, // 6 hours per harvesting
      preparation: (taskData.preparation || 0) * 3, // 3 hours per preparation
      storage: (taskData.storage || 0) * 2, // 2 hours per storage
      marketing: (taskData.marketing || 0) * 4, // 4 hours per marketing
      seed_preparation: (taskData.seed_preparation || 0) * 2,
      nursery_management: (taskData.nursery_management || 0) * 3,
      field_preparation: (taskData.field_preparation || 0) * 4,
      transplanting: (taskData.transplanting || 0) * 5,
      pruning: (taskData.pruning || 0) * 3,
      ginning: (taskData.ginning || 0) * 4,
      threshing: (taskData.threshing || 0) * 3
    };

    // Calculate total labor hours
    const totalLaborHours = Object.values(laborHours).reduce((sum, hours) => sum + hours, 0);
    const totalLaborHoursForArea = totalLaborHours * acreArea;

    // Calculate costs (approximate rates in PKR)
    const laborRate = 500; // PKR per hour
    const irrigationCost = 200; // PKR per irrigation
    const fertilizerCost = 1500; // PKR per application
    const pestControlCost = 800; // PKR per application

    const totalLaborCost = totalLaborHoursForArea * laborRate;
    const totalIrrigationCost = irrigationFrequency * irrigationCost * acreArea;
    const totalFertilizerCost = (taskData.fertilization || 0) * fertilizerCost * acreArea;
    const totalPestControlCost = pestControlFrequency * pestControlCost * acreArea;
    const totalCost = totalLaborCost + totalIrrigationCost + totalFertilizerCost + totalPestControlCost;

    // Generate timeline
    const startDateObj = startDate ? new Date(startDate) : new Date();
    const timeline = [];
    
    let currentDate = new Date(startDateObj);
    for (let i = 0; i < adjustedDuration; i += 7) { // Weekly milestones
      const weekNumber = Math.floor(i / 7) + 1;
      const weekDate = new Date(currentDate);
      weekDate.setDate(currentDate.getDate() + i);
      
      timeline.push({
        week: weekNumber,
        date: weekDate.toISOString().split('T')[0],
        activities: getWeeklyActivities(weekNumber, taskData, adjustedDuration)
      });
    }

    // Generate recommendations
    const recommendations = generatePlanningRecommendations(cropType, growthStage, soilType, weatherCondition, season);

    const result = {
      crop: {
        name: cropData.name,
        english: cropData.english
      },
      stage: {
        name: stageData.name,
        english: stageData.english,
        duration: adjustedDuration,
        unit: "دن",
        english_unit: "days"
      },
      soil: {
        name: soilData.name,
        english: soilData.english
      },
      weather: {
        name: weatherData.name,
        english: weatherData.english
      },
      requirements: {
        irrigation: {
          frequency: irrigationFrequency,
          unit: "بار",
          english: "times"
        },
        pest_control: {
          frequency: pestControlFrequency,
          unit: "بار",
          english: "times"
        },
        labor: {
          hours: totalLaborHoursForArea,
          unit: "گھنٹے",
          english: "hours"
        }
      },
      costs: {
        labor: totalLaborCost,
        irrigation: totalIrrigationCost,
        fertilizer: totalFertilizerCost,
        pest_control: totalPestControlCost,
        total: totalCost,
        currency: "روپے",
        english: "PKR"
      },
      timeline: timeline,
      recommendations: recommendations,
      area: acreArea,
      factors: {
        soil: soilFactor,
        weather: weatherFactor
      }
    };

    console.log('✅ Planning calculation completed:', result);
    res.status(200).json(result);

  } catch (error) {
    console.error('❌ Planning calculation error:', error);
    res.status(500).json({
      error: "حساب میں مسئلہ ہوا",
      english: "Calculation error occurred"
    });
  }
};

// Helper function to get weekly activities
const getWeeklyActivities = (weekNumber, taskData, totalDuration) => {
  const activities = [];
  
  if (weekNumber === 1) {
    if (taskData.irrigation) activities.push("آبپاشی");
    if (taskData.fertilization) activities.push("کھاد ڈالنا");
    if (taskData.weeding) activities.push("گھاس صاف کرنا");
  }
  
  if (weekNumber === Math.ceil(totalDuration / 7 / 2)) {
    if (taskData.pest_control) activities.push("کیڑے مار دوا");
    if (taskData.monitoring) activities.push("نگرانی");
  }
  
  if (weekNumber === Math.ceil(totalDuration / 7)) {
    if (taskData.harvesting) activities.push("کٹائی");
    if (taskData.storage) activities.push("ذخیرہ");
  }
  
  return activities;
};

// Helper function to generate recommendations
const generatePlanningRecommendations = (cropType, growthStage, soilType, weatherCondition, season) => {
  const recommendations = [];
  
  // Weather-based recommendations
  if (weatherCondition === 'dry') {
    recommendations.push({
      type: "آبپاشی",
      english: "Irrigation",
      advice: "زیادہ آبپاشی کی ضرورت ہوگی",
      english_advice: "More irrigation will be needed"
    });
  }
  
  if (weatherCondition === 'humid') {
    recommendations.push({
      type: "کیڑے کنٹرول",
      english: "Pest Control",
      advice: "زیادہ کیڑے مار دوا کی ضرورت ہوگی",
      english_advice: "More pest control will be needed"
    });
  }
  
  // Soil-based recommendations
  if (soilType === 'clay') {
    recommendations.push({
      type: "مٹی کی تیاری",
      english: "Soil Preparation",
      advice: "زیادہ وقت مٹی کی تیاری میں لگے گا",
      english_advice: "More time will be needed for soil preparation"
    });
  }
  
  if (soilType === 'sandy') {
    recommendations.push({
      type: "آبپاشی",
      english: "Irrigation",
      advice: "زیادہ بار بار آبپاشی کی ضرورت ہوگی",
      english_advice: "More frequent irrigation will be needed"
    });
  }
  
  // Crop-specific recommendations
  if (cropType === 'rice' && growthStage === 'nursery') {
    recommendations.push({
      type: "نرسری مینجمنٹ",
      english: "Nursery Management",
      advice: "نرسری کی خاص دیکھ بھال کی ضرورت ہے",
      english_advice: "Special care is needed for nursery management"
    });
  }
  
  if (cropType === 'cotton' && growthStage === 'flowering') {
    recommendations.push({
      type: "کیڑے کنٹرول",
      english: "Pest Control",
      advice: "کپاس کے کیڑوں پر خاص توجہ دیں",
      english_advice: "Pay special attention to cotton pests"
    });
  }
  
  return recommendations;
};

// Get planning data (crops, stages, soils, weather conditions)
const getPlanningData = (req, res) => {
  try {
    const crops = Object.keys(CROP_PLANNING_DATA).map(key => ({
      key,
      name: CROP_PLANNING_DATA[key].name,
      english: CROP_PLANNING_DATA[key].english,
      seasons: Object.keys(CROP_PLANNING_DATA[key].seasons).map(seasonKey => ({
        key: seasonKey,
        name: CROP_PLANNING_DATA[key].seasons[seasonKey].name,
        english: CROP_PLANNING_DATA[key].seasons[seasonKey].english
      })),
      stages: Object.keys(CROP_PLANNING_DATA[key].stages).map(stageKey => ({
        key: stageKey,
        name: CROP_PLANNING_DATA[key].stages[stageKey].name,
        english: CROP_PLANNING_DATA[key].stages[stageKey].english,
        duration: CROP_PLANNING_DATA[key].stages[stageKey].duration
      }))
    }));

    const soils = Object.keys(SOIL_WORK_DATA).map(key => ({
      key,
      name: SOIL_WORK_DATA[key].name,
      english: SOIL_WORK_DATA[key].english
    }));

    const weatherConditions = Object.keys(WEATHER_CONDITIONS).map(key => ({
      key,
      name: WEATHER_CONDITIONS[key].name,
      english: WEATHER_CONDITIONS[key].english
    }));

    res.status(200).json({
      crops,
      soils,
      weatherConditions
    });
  } catch (error) {
    console.error('❌ Get planning data error:', error);
    res.status(500).json({
      error: "ڈیٹا حاصل کرنے میں مسئلہ ہوا",
      english: "Error fetching data"
    });
  }
};

module.exports = { calculatePlanning, getPlanningData }; 