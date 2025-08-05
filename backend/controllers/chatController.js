const axios = require('axios');

// Gemini API configuration
const GEMINI_API = {
  name: 'Google Gemini',
  url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  token: 'AIzaSyB0Qd606zk3kKSq4aoPSZjDWXteTWVCTig'
};

const askChatGPT = async (req, res) => {
  const { userInput } = req.body;

  console.log('📥 Received request:', { userInput });

  if (!userInput) {
    console.log('❌ No user input provided');
    return res.status(400).json({ error: "No user input provided." });
  }

  // Try Gemini API
  try {
    console.log(`🤖 Trying ${GEMINI_API.name} API...`);
    
    const response = await axios.post(
      `${GEMINI_API.url}?key=${GEMINI_API.token}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an expert agricultural assistant specifically for Pakistani farmers. Provide location-specific advice 2-3 lines for Pakistan's climate, soil conditions, and agricultural practices.

CONTEXT FOR PAKISTAN:
- Climate: Semi-arid to arid with hot summers and cool winters
- Major growing regions: Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan
- Soil types: Alluvial soils in Punjab/Sindh, clay loam in KP, sandy in Balochistan
- Water sources: Canal irrigation, tube wells, rainfall (monsoon)
- Major crops: Wheat, Rice, Cotton, Sugarcane, Maize, Pulses
- Growing seasons: Rabi (Oct-Mar), Kharif (Apr-Sep)
- Common pests: Cotton bollworm, wheat aphid, rice stem borer
- Fertilizer types: NPK, Urea, DAP commonly used

Provide specific, actionable answers in English for better voice compatibility. Focus on Pakistan's farming conditions, local crop varieties, regional weather patterns, and practical solutions for Pakistani farmers. Keep responses clear and audible.

User question: ${userInput}`
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7,
          topP: 0.8,
          topK: 40
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    let aiReply = '';
    if (response.data && response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content && response.data.candidates[0].content.parts && response.data.candidates[0].content.parts[0]) {
      aiReply = response.data.candidates[0].content.parts[0].text;
    }

    if (aiReply && aiReply.length > 10) {
      console.log(`✅ ${GEMINI_API.name} API Success:`, aiReply);
      return res.status(200).json({ reply: aiReply, ai: true, api: GEMINI_API.name });
    }
  } catch (error) {
    console.log(`❌ ${GEMINI_API.name} API failed:`, error.message);
  }

  // Enhanced fallback responses for agricultural queries with bilingual support
  const agriculturalResponses = {
    // Wheat related queries - Pakistan specific
    "wheat": {
      urdu: "پاکستان میں گندم کی کاشت نومبر سے دسمبر میں کریں۔ پنجاب اور سندھ میں نومبر، خیبر پختونخوا میں دسمبر۔ NPK کھاد 50-25-25 کلوگرام فی ایکڑ استعمال کریں۔",
      english: "Plant wheat in Pakistan from November to December. November in Punjab and Sindh, December in Khyber Pakhtunkhwa. Use NPK fertilizer 50-25-25 kg per acre."
    },
    "گندم": {
      urdu: "پاکستان میں گندم کی کاشت نومبر سے دسمبر میں کریں۔ پنجاب اور سندھ میں نومبر، خیبر پختونخوا میں دسمبر۔ NPK کھاد 50-25-25 کلوگرام فی ایکڑ استعمال کریں۔",
      english: "Plant wheat in Pakistan from November to December. November in Punjab and Sindh, December in Khyber Pakhtunkhwa. Use NPK fertilizer 50-25-25 kg per acre."
    },
    
    // Rice related queries - Pakistan specific
    "rice": {
      urdu: "پاکستان میں چاول کی کاشت مئی سے جون میں کریں۔ سندھ میں مئی، پنجاب میں جون۔ پانی کی زیادہ مقدار دیں، ڈرپ ایریگیشن استعمال کریں۔",
      english: "Plant rice in Pakistan from May to June. May in Sindh, June in Punjab. Provide plenty of water, use drip irrigation."
    },
    "چاول": {
      urdu: "پاکستان میں چاول کی کاشت مئی سے جون میں کریں۔ سندھ میں مئی، پنجاب میں جون۔ پانی کی زیادہ مقدار دیں، ڈرپ ایریگیشن استعمال کریں۔",
      english: "Plant rice in Pakistan from May to June. May in Sindh, June in Punjab. Provide plenty of water, use drip irrigation."
    },
    
    // Cotton related queries - Pakistan specific
    "cotton": {
      urdu: "پاکستان میں کپاس کی کاشت فروری سے مارچ میں کریں۔ سندھ میں فروری، پنجاب میں مارچ۔ کپاس کے کیڑے سے بچاؤ کے لیے مناسب دوائی کا استعمال کریں۔",
      english: "Plant cotton in Pakistan from February to March. February in Sindh, March in Punjab. Use appropriate pesticides for cotton bollworm control."
    },
    "کپاس": {
      urdu: "پاکستان میں کپاس کی کاشت فروری سے مارچ میں کریں۔ سندھ میں فروری، پنجاب میں مارچ۔ کپاس کے کیڑے سے بچاؤ کے لیے مناسب دوائی کا استعمال کریں۔",
      english: "Plant cotton in Pakistan from February to March. February in Sindh, March in Punjab. Use appropriate pesticides for cotton bollworm control."
    },
    
    // Sugarcane related queries
    "sugarcane": {
      urdu: "گنے کی کاشت فروری سے مارچ میں کریں۔ پانی کی زیادہ مقدار دیں۔",
      english: "Plant sugarcane from February to March. Provide plenty of water."
    },
    "گنا": {
      urdu: "گنے کی کاشت فروری سے مارچ میں کریں۔ پانی کی زیادہ مقدار دیں۔",
      english: "Plant sugarcane from February to March. Provide plenty of water."
    },
    
    // Maize related queries
    "maize": {
      urdu: "مکئی کی کاشت مارچ سے اپریل میں کریں۔ کھاد کا مناسب استعمال کریں۔",
      english: "Plant maize from March to April. Use fertilizers appropriately."
    },
    "مکئی": {
      urdu: "مکئی کی کاشت مارچ سے اپریل میں کریں۔ کھاد کا مناسب استعمال کریں۔",
      english: "Plant maize from March to April. Use fertilizers appropriately."
    },
    
    // Weather related queries - Pakistan specific
    "weather": {
      urdu: "پاکستان کے موسم کے مطابق کھیتی کریں۔ گرمی میں صبح شام پانی دیں، سردی میں دوپہر کو۔ مون سون میں بارش کا خیال رکھیں۔",
      english: "Farm according to Pakistan's weather. Water in morning/evening during summer, afternoon in winter. Be careful of monsoon rains."
    },
    "موسم": {
      urdu: "پاکستان کے موسم کے مطابق کھیتی کریں۔ گرمی میں صبح شام پانی دیں، سردی میں دوپہر کو۔ مون سون میں بارش کا خیال رکھیں۔",
      english: "Farm according to Pakistan's weather. Water in morning/evening during summer, afternoon in winter. Be careful of monsoon rains."
    },
    
    // Pest control queries
    "pest": {
      urdu: "کیڑوں سے بچاؤ کے لیے مناسب دوائی کا استعمال کریں۔ کیمیائی دوائیوں کے ساتھ قدرتی طریقے بھی استعمال کریں۔",
      english: "Use appropriate pesticides for pest control. Use natural methods along with chemical pesticides."
    },
    "کیڑے": {
      urdu: "کیڑوں سے بچاؤ کے لیے مناسب دوائی کا استعمال کریں۔ کیمیائی دوائیوں کے ساتھ قدرتی طریقے بھی استعمال کریں۔",
      english: "Use appropriate pesticides for pest control. Use natural methods along with chemical pesticides."
    },
    
    // Water management queries - Pakistan specific
    "water": {
      urdu: "پاکستان میں پانی کی بچت کے لیے ڈرپ ایریگیشن استعمال کریں۔ نہری پانی اور ٹیوب ویل کا مناسب استعمال کریں۔ صبح یا شام کو پانی دیں۔",
      english: "Use drip irrigation to save water in Pakistan. Use canal water and tube wells properly. Water in morning or evening."
    },
    "پانی": {
      urdu: "پاکستان میں پانی کی بچت کے لیے ڈرپ ایریگیشن استعمال کریں۔ نہری پانی اور ٹیوب ویل کا مناسب استعمال کریں۔ صبح یا شام کو پانی دیں۔",
      english: "Use drip irrigation to save water in Pakistan. Use canal water and tube wells properly. Water in morning or evening."
    },
    
    // Fertilizer queries - Pakistan specific
    "fertilizer": {
      urdu: "پاکستان میں NPK، یوریا، DAP کھاد کا استعمال کریں۔ گندم کے لیے 50-25-25، چاول کے لیے 60-30-30 کلوگرام فی ایکڑ۔",
      english: "Use NPK, Urea, DAP fertilizers in Pakistan. 50-25-25 for wheat, 60-30-30 kg per acre for rice."
    },
    "کھاد": {
      urdu: "پاکستان میں NPK، یوریا، DAP کھاد کا استعمال کریں۔ گندم کے لیے 50-25-25، چاول کے لیے 60-30-30 کلوگرام فی ایکڑ۔",
      english: "Use NPK, Urea, DAP fertilizers in Pakistan. 50-25-25 for wheat, 60-30-30 kg per acre for rice."
    },
    
    // Harvest queries
    "harvest": {
      urdu: "فصل کی کٹائی کے لیے مناسب وقت کا انتظار کریں۔ خشک موسم میں کٹائی کریں۔",
      english: "Wait for the appropriate time for crop harvesting. Harvest in dry weather."
    },
    "کٹائی": {
      urdu: "فصل کی کٹائی کے لیے مناسب وقت کا انتظار کریں۔ خشک موسم میں کٹائی کریں۔",
      english: "Wait for the appropriate time for crop harvesting. Harvest in dry weather."
    },
    
    // Tractor queries
    "tractor": {
      urdu: "ٹریکٹر کا استعمال کھیتی کے لیے ضروری ہے۔ مناسب HP کا ٹریکٹر استعمال کریں۔",
      english: "Tractor use is essential for farming. Use a tractor with appropriate HP."
    },
    "ٹریکٹر": {
      urdu: "ٹریکٹر کا استعمال کھیتی کے لیے ضروری ہے۔ مناسب HP کا ٹریکٹر استعمال کریں۔",
      english: "Tractor use is essential for farming. Use a tractor with appropriate HP."
    },
    
    // Seed queries
    "seed": {
      urdu: "اچھے بیج کا انتخاب کریں۔ بیماری سے پاک بیج استعمال کریں۔",
      english: "Choose good quality seeds. Use disease-free seeds."
    },
    "بیج": {
      urdu: "اچھے بیج کا انتخاب کریں۔ بیماری سے پاک بیج استعمال کریں۔",
      english: "Choose good quality seeds. Use disease-free seeds."
    },
    
    // Soil queries
    "soil": {
      urdu: "مٹی کی جانچ کریں۔ pH لیول 6.5 سے 7.5 کے درمیان ہونا چاہیے۔",
      english: "Check soil quality. pH level should be between 6.5 to 7.5."
    },
    "مٹی": {
      urdu: "مٹی کی جانچ کریں۔ pH لیول 6.5 سے 7.5 کے درمیان ہونا چاہیے۔",
      english: "Check soil quality. pH level should be between 6.5 to 7.5."
    },
    
    // Disease queries
    "disease": {
      urdu: "پودوں کی بیماریوں سے بچاؤ کے لیے مناسب دوائی کا استعمال کریں۔ صفائی کا خیال رکھیں۔",
      english: "Use appropriate pesticides to prevent plant diseases. Maintain cleanliness."
    },
    "بیماری": {
      urdu: "پودوں کی بیماریوں سے بچاؤ کے لیے مناسب دوائی کا استعمال کریں۔ صفائی کا خیال رکھیں۔",
      english: "Use appropriate pesticides to prevent plant diseases. Maintain cleanliness."
    },
    
    // Market queries
    "market": {
      urdu: "فصل کی قیمت مارکیٹ میں چیک کریں۔ مناسب وقت پر فروخت کریں۔",
      english: "Check crop prices in the market. Sell at the appropriate time."
    },
    "مارکیٹ": {
      urdu: "فصل کی قیمت مارکیٹ میں چیک کریں۔ مناسب وقت پر فروخت کریں۔",
      english: "Check crop prices in the market. Sell at the appropriate time."
    },
  
    
    // Planting queries
    "ugani": {
      urdu: "کاشت کے بارے میں پوچھ رہے ہیں۔ براہ کرم بتائیں کہ کس فصل کی کاشت کے بارے میں جاننا چاہتے ہیں۔",
      english: "You're asking about cultivation. Please tell me which crop's cultivation you want to know about."
    },
    "کاشت": "کاشت کے بارے میں پوچھ رہے ہیں۔ براہ کرم بتائیں کہ کس فصل کی کاشت کے بارے میں جاننا چاہتے ہیں۔",
    
    // Requirement queries
    "chahie": "ضرورت کے بارے میں پوچھ رہے ہیں۔ براہ کرم بتائیں کہ کس چیز کی ضرورت ہے۔",
    "ضرورت": "ضرورت کے بارے میں پوچھ رہے ہیں۔ براہ کرم بتائیں کہ کس چیز کی ضرورت ہے۔",
    
    // Plant queries
    "plant": "کاشت کے بارے میں پوچھ رہے ہیں۔ براہ کرم بتائیں کہ کس فصل کی کاشت کے بارے میں جاننا چاہتے ہیں۔",
    "when": "وقت کے بارے میں پوچھ رہے ہیں۔ براہ کرم بتائیں کہ کس کام کا وقت جاننا چاہتے ہیں۔",
    "should": "ضرورت کے بارے میں پوچھ رہے ہیں۔ براہ کرم بتائیں کہ کس چیز کی ضرورت ہے۔"
  };

  // Enhanced keyword matching with context and language detection
  const lowerInput = userInput.toLowerCase();
  let agriculturalReply = null;
  
  // Detect if input contains Urdu characters
  const hasUrdu = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(userInput);
  const isEnglish = /^[a-zA-Z\s]+$/.test(userInput);
  
  // Determine response language
  const responseLanguage = hasUrdu ? 'urdu' : 'english';

  // Check for specific agricultural combinations first
  if (lowerInput.includes("gandum") && (lowerInput.includes("kab") || lowerInput.includes("when")) && (lowerInput.includes("ugani") || lowerInput.includes("plant"))) {
    agriculturalReply = responseLanguage === 'urdu' 
      ? "گندم کی کاشت کے لیے نومبر سے دسمبر کا وقت بہترین ہے۔ پانی کی مناسب مقدار دیں اور کھاد کا استعمال کریں۔"
      : "The best time for wheat cultivation is from November to December. Provide adequate water and use fertilizers.";
    console.log('🌾 Matched wheat planting question:', userInput);
  } else if (lowerInput.includes("rice") && (lowerInput.includes("kab") || lowerInput.includes("when"))) {
    agriculturalReply = responseLanguage === 'urdu'
      ? "چاول کی کاشت کے لیے مئی سے جون کا وقت مناسب ہے۔ پانی کی زیادہ مقدار کی ضرورت ہوتی ہے۔"
      : "The suitable time for rice cultivation is from May to June. It requires a large amount of water.";
    console.log('🌾 Matched rice planting question:', userInput);
  } else if (lowerInput.includes("cotton") && (lowerInput.includes("kab") || lowerInput.includes("when"))) {
    agriculturalReply = responseLanguage === 'urdu'
      ? "کپاس کی کاشت فروری سے مارچ میں کریں۔ کیڑوں سے بچاؤ کے لیے مناسب دوائی کا استعمال کریں۔"
      : "Plant cotton from February to March. Use appropriate pesticides for pest control.";
    console.log('🌾 Matched cotton planting question:', userInput);
  } else {
    // Check for specific keywords and provide relevant answers
    for (const [keyword, response] of Object.entries(agriculturalResponses)) {
      if (lowerInput.includes(keyword)) {
        // Check if response is an object with urdu/english properties
        if (typeof response === 'object' && response.urdu && response.english) {
          agriculturalReply = responseLanguage === 'urdu' ? response.urdu : response.english;
        } else {
          // Handle old format responses
          agriculturalReply = response;
        }
        console.log('🔍 Matched keyword:', keyword, 'for input:', userInput, 'language:', responseLanguage);
        break;
      }
    }
  }

  // If we have a good agricultural response, use it
  if (agriculturalReply) {
    console.log('🌱 Using agricultural response:', agriculturalReply);
    return res.status(200).json({ reply: agriculturalReply, fallback: true });
  }

  // Enhanced fallback for unclear questions with bilingual support
  let fallbackReply = responseLanguage === 'urdu' 
    ? "معذرت، میں آپ کی بات نہیں سمجھ سکا۔ براہ کرم اپنا سوال واضح طور پر پوچھیں۔"
    : "Sorry, I couldn't understand your question. Please ask your question clearly.";

  if (lowerInput.includes("کیسے") || lowerInput.includes("how")) {
    fallbackReply = responseLanguage === 'urdu'
      ? "آپ کا سوال واضح نہیں ہے۔ براہ کرم بتائیں کہ آپ کس فصل یا مسئلے کے بارے میں پوچھ رہے ہیں۔"
      : "Your question is not clear. Please tell me which crop or issue you're asking about.";
  } else if (lowerInput.includes("کب") || lowerInput.includes("when")) {
    fallbackReply = responseLanguage === 'urdu'
      ? "وقت کے بارے میں پوچھ رہے ہیں۔ براہ کرم بتائیں کہ کس کام کا وقت جاننا چاہتے ہیں۔"
      : "You're asking about timing. Please tell me what work's timing you want to know.";
  } else if (lowerInput.includes("کیا") || lowerInput.includes("what")) {
    fallbackReply = responseLanguage === 'urdu'
      ? "آپ کیا جاننا چاہتے ہیں؟ براہ کرم اپنا سوال واضح کریں۔"
      : "What do you want to know? Please clarify your question.";
  } else if (lowerInput.includes("help") || lowerInput.includes("مدد")) {
    fallbackReply = responseLanguage === 'urdu'
      ? "میں آپ کی کھیتی کے بارے میں مدد کر سکتا ہوں۔ آپ فصل، کھاد، کیڑے، موسم یا کسی اور چیز کے بارے میں پوچھ سکتے ہیں۔"
      : "I can help you with farming. You can ask about crops, fertilizers, pests, weather, or anything else.";
  }

  console.log('🔧 Using enhanced fallback response:', fallbackReply);
  return res.status(200).json({ reply: fallbackReply, fallback: true });
};

// Handle voice-specific queries with enhanced responses
const handleVoiceQuery = async (req, res) => {
  const { userInput, language = 'en' } = req.body;

  console.log('📥 Received voice request:', { userInput, language });

  if (!userInput) {
    console.log('❌ No voice input provided');
    return res.status(400).json({ error: "No voice input provided." });
  }

  // Try Gemini API for voice queries
  try {
    console.log(`🤖 Trying ${GEMINI_API.name} API for voice...`);
    
    const response = await axios.post(
      `${GEMINI_API.url}?key=${GEMINI_API.token}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an agricultural voice assistant specifically for Pakistani farmers. Provide location-specific advice in 2 lines for Pakistan's climate and agricultural practices.

CONTEXT FOR PAKISTAN:
- Climate: Semi-arid to arid with hot summers and cool winters
- Major growing regions: Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan
- Soil types: Alluvial soils in Punjab/Sindh, clay loam in KP, sandy in Balochistan
- Water sources: Canal irrigation, tube wells, rainfall (monsoon)
- Major crops: Wheat, Rice, Cotton, Sugarcane, Maize, Pulses
- Growing seasons: Rabi (Oct-Mar), Kharif (Apr-Sep)
- Common pests: Cotton bollworm, wheat aphid, rice stem borer
- Fertilizer types: NPK, Urea, DAP commonly used

Provide specific 2 lines, actionable answers in ${language === 'ur' ? 'Urdu' : 'English'} with clear, spoken-friendly language. Focus on Pakistan's farming conditions, local crop varieties, regional weather patterns, and practical solutions for Pakistani farmers. Keep responses short but specific to the question asked. Make responses audible and clear.

User question: ${userInput}`
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 200,
          temperature: 0.7,
          topP: 0.8,
          topK: 40
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    let aiVoiceReply = '';
    if (response.data && response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content && response.data.candidates[0].content.parts && response.data.candidates[0].content.parts[0]) {
      aiVoiceReply = response.data.candidates[0].content.parts[0].text;
    }

    if (aiVoiceReply && aiVoiceReply.length > 10) {
      console.log(`✅ ${GEMINI_API.name} Voice API Success:`, aiVoiceReply);
      return res.status(200).json({ reply: aiVoiceReply, language, ai: true, api: GEMINI_API.name });
    }
  } catch (error) {
    console.log(`❌ ${GEMINI_API.name} Voice API failed:`, error.message);
  }

  // Enhanced voice responses for agricultural queries
  const voiceResponses = {
      "wheat": language === 'ur' ? "گندم کی کاشت کے لیے نومبر سے دسمبر کا وقت بہترین ہے۔" : "Wheat should be planted from November to December.",
      "rice": language === 'ur' ? "چاول کی کاشت کے لیے مئی سے جون کا وقت مناسب ہے۔" : "Rice should be planted from May to June.",
      "cotton": language === 'ur' ? "کپاس کی کاشت فروری سے مارچ میں کریں۔" : "Cotton should be planted from February to March.",
      "gandum": language === 'ur' ? "گندم کی کاشت کے لیے نومبر سے دسمبر کا وقت بہترین ہے۔" : "Wheat should be planted from November to December.",
      "kab": language === 'ur' ? "وقت کے بارے میں پوچھ رہے ہیں۔" : "You're asking about timing.",
      "ugani": language === 'ur' ? "کاشت کے بارے میں پوچھ رہے ہیں۔" : "You're asking about cultivation.",
    "chahie": language === 'ur' ? "ضرورت کے بارے میں پوچھ رہے ہیں۔" : "You're asking about requirements.",
    "weather": language === 'ur' ? "آج کا موسم کھیتی کے لیے اچھا ہے۔" : "Today's weather is good for farming.",
    "pest": language === 'ur' ? "کیڑوں سے بچاؤ کے لیے مناسب دوائی کا استعمال کریں۔" : "Use appropriate pesticides for pest control.",
    "water": language === 'ur' ? "پانی کی بچت کے لیے ڈرپ ایریگیشن استعمال کریں۔" : "Use drip irrigation to save water.",
    "paani": language === 'ur' ? "پانی کی بچت کے لیے ڈرپ ایریگیشن استعمال کریں۔" : "Use drip irrigation to save water.",
    "fertilizer": language === 'ur' ? "کھاد کا استعمال موسم اور فصل کے مطابق کریں۔" : "Use fertilizer according to season and crop."
    };

    const lowerInput = userInput.toLowerCase();
  let voiceReply = language === 'ur' 
      ? "معذرت، میں آپ کی بات نہیں سمجھ سکا۔ براہ کرم اپنا سوال واضح طور پر پوچھیں۔"
      : "Sorry, I couldn't understand. Please ask your question clearly.";

    // Check for specific keywords and provide relevant answers
  for (const [keyword, response] of Object.entries(voiceResponses)) {
      if (lowerInput.includes(keyword)) {
      voiceReply = response;
        break;
      }
    }

  console.log('🔧 Using voice fallback response:', voiceReply);
  return res.status(200).json({ reply: voiceReply, language, fallback: true });
};

module.exports = { askChatGPT, handleVoiceQuery };

