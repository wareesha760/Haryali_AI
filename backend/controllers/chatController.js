const axios = require('axios');

// Multiple reliable free AI API options
const AI_APIS = [
  {
    name: 'Hugging Face Router',
    url: 'https://router.huggingface.co/v1/chat/completions',
    model: 'moonshotai/Kimi-K2-Instruct',
    token: process.env.HF_TOKEN || 'hf_demo'
  },
  {
    name: 'Hugging Face Inference',
    url: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
    token: process.env.HF_TOKEN || 'hf_demo'
  },
  {
    name: 'Hugging Face Text Generation',
    url: 'https://api-inference.huggingface.co/models/gpt2',
    token: process.env.HF_TOKEN || 'hf_demo'
  }
];

const askChatGPT = async (req, res) => {
  const { userInput } = req.body;

  console.log('📥 Received request:', { userInput });

  if (!userInput) {
    console.log('❌ No user input provided');
    return res.status(400).json({ error: "No user input provided." });
  }

  // Try multiple AI APIs in sequence
  for (let i = 0; i < AI_APIS.length; i++) {
    const api = AI_APIS[i];
    try {
      console.log(`🤖 Trying ${api.name} API...`);
      
      let response;
      if (api.name === 'Hugging Face Router') {
        response = await axios.post(
          api.url,
          {
            model: api.model,
        messages: [
                    {
            role: "system", 
                content: "You are an expert agricultural assistant for Pakistani farmers. Provide specific, actionable answers in English for better voice compatibility. Focus on farming, crops, weather, pests, water management, and agricultural practices. Keep responses clear and audible."
          },
          { 
            role: "user", 
                content: userInput
              }
            ],
            max_tokens: 300,
            temperature: 0.7
          },
          {
            headers: {
              'Authorization': `Bearer ${api.token}`,
              'Content-Type': 'application/json'
            },
            timeout: 10000
          }
        );
      } else {
        // Hugging Face Inference APIs
        response = await axios.post(
          api.url,
          {
            inputs: `Farmer: ${userInput}\nAgricultural Assistant:`,
            parameters: {
              max_length: 200,
              temperature: 0.7,
              do_sample: true
            }
      },
      {
        headers: {
              'Authorization': `Bearer ${api.token}`,
          'Content-Type': 'application/json'
            },
            timeout: 8000
          }
        );
      }

      let aiReply = '';
      if (api.name === 'Hugging Face Router') {
        if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
          aiReply = response.data.choices[0].message.content;
        }
      } else {
        // Hugging Face Inference
        if (response.data && response.data[0] && response.data[0].generated_text) {
          aiReply = response.data[0].generated_text.replace('Agricultural Assistant:', '').trim();
        }
      }

      if (aiReply && aiReply.length > 10) {
        console.log(`✅ ${api.name} API Success:`, aiReply);
        return res.status(200).json({ reply: aiReply, ai: true, api: api.name });
      }
  } catch (error) {
      console.log(`❌ ${api.name} API failed:`, error.message);
      continue; // Try next API
    }
  }

  // Enhanced fallback responses for agricultural queries with bilingual support
  const agriculturalResponses = {
    // Wheat related queries
    "wheat": {
      urdu: "گندم کی کاشت کے لیے نومبر سے دسمبر کا وقت بہترین ہے۔ پانی کی مناسب مقدار دیں اور کھاد کا استعمال کریں۔",
      english: "The best time for wheat cultivation is from November to December. Provide adequate water and use fertilizers."
    },
    "gandum": {
      urdu: "گندم کی کاشت کے لیے نومبر سے دسمبر کا وقت بہترین ہے۔ پانی کی مناسب مقدار دیں اور کھاد کا استعمال کریں۔",
      english: "The best time for wheat cultivation is from November to December. Provide adequate water and use fertilizers."
    },
    "گندم": {
      urdu: "گندم کی کاشت کے لیے نومبر سے دسمبر کا وقت بہترین ہے۔ پانی کی مناسب مقدار دیں اور کھاد کا استعمال کریں۔",
      english: "The best time for wheat cultivation is from November to December. Provide adequate water and use fertilizers."
    },
    
    // Rice related queries
    "rice": {
      urdu: "چاول کی کاشت کے لیے مئی سے جون کا وقت مناسب ہے۔ پانی کی زیادہ مقدار کی ضرورت ہوتی ہے۔",
      english: "The suitable time for rice cultivation is from May to June. It requires a large amount of water."
    },
    "چاول": {
      urdu: "چاول کی کاشت کے لیے مئی سے جون کا وقت مناسب ہے۔ پانی کی زیادہ مقدار کی ضرورت ہوتی ہے۔",
      english: "The suitable time for rice cultivation is from May to June. It requires a large amount of water."
    },
    
    // Cotton related queries
    "cotton": {
      urdu: "کپاس کی کاشت فروری سے مارچ میں کریں۔ کیڑوں سے بچاؤ کے لیے مناسب دوائی کا استعمال کریں۔",
      english: "Plant cotton from February to March. Use appropriate pesticides for pest control."
    },
    "کپاس": {
      urdu: "کپاس کی کاشت فروری سے مارچ میں کریں۔ کیڑوں سے بچاؤ کے لیے مناسب دوائی کا استعمال کریں۔",
      english: "Plant cotton from February to March. Use appropriate pesticides for pest control."
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
    
    // Weather related queries
    "weather": {
      urdu: "آج کا موسم کھیتی کے لیے اچھا ہے۔ پانی کا خیال رکھیں اور ضرورت پڑنے پر سایہ کریں۔",
      english: "Today's weather is good for farming. Take care of water and provide shade when needed."
    },
    "موسم": {
      urdu: "آج کا موسم کھیتی کے لیے اچھا ہے۔ پانی کا خیال رکھیں اور ضرورت پڑنے پر سایہ کریں۔",
      english: "Today's weather is good for farming. Take care of water and provide shade when needed."
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
    
    // Water management queries
    "water": {
      urdu: "پانی کی بچت کے لیے ڈرپ ایریگیشن استعمال کریں۔ صبح یا شام کو پانی دیں۔",
      english: "Use drip irrigation for water conservation. Water in the morning or evening."
    },
    "پانی": {
      urdu: "پانی کی بچت کے لیے ڈرپ ایریگیشن استعمال کریں۔ صبح یا شام کو پانی دیں۔",
      english: "Use drip irrigation for water conservation. Water in the morning or evening."
    },
    "paani": {
      urdu: "پانی کی بچت کے لیے ڈرپ ایریگیشن استعمال کریں۔ صبح یا شام کو پانی دیں۔",
      english: "Use drip irrigation for water conservation. Water in the morning or evening."
    },
    
    // Fertilizer queries
    "fertilizer": {
      urdu: "کھاد کا استعمال موسم اور فصل کے مطابق کریں۔ NPK کھاد کا مناسب تناسب استعمال کریں۔",
      english: "Use fertilizers according to season and crop. Use appropriate NPK fertilizer ratio."
    },
    "کھاد": {
      urdu: "کھاد کا استعمال موسم اور فصل کے مطابق کریں۔ NPK کھاد کا مناسب تناسب استعمال کریں۔",
      english: "Use fertilizers according to season and crop. Use appropriate NPK fertilizer ratio."
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
    
    // Time-related queries
    "kab": {
      urdu: "وقت کے بارے میں پوچھ رہے ہیں۔ براہ کرم بتائیں کہ کس کام کا وقت جاننا چاہتے ہیں۔",
      english: "You're asking about timing. Please tell me what work's timing you want to know."
    },
    "کب": {
      urdu: "وقت کے بارے میں پوچھ رہے ہیں۔ براہ کرم بتائیں کہ کس کام کا وقت جاننا چاہتے ہیں۔",
      english: "You're asking about timing. Please tell me what work's timing you want to know."
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

  // Try multiple AI APIs for voice queries
  for (let i = 0; i < AI_APIS.length; i++) {
    const api = AI_APIS[i];
    try {
      console.log(`🤖 Trying ${api.name} API for voice...`);
      
      let response;
      if (api.name === 'Hugging Face Router') {
        response = await axios.post(
          api.url,
          {
            model: api.model,
            messages: [
              {
                role: "system",
                content: `You are an agricultural voice assistant for Pakistani farmers. Provide specific, actionable answers in ${language === 'ur' ? 'Urdu' : 'English'} with clear, spoken-friendly language. Keep responses short but specific to the question asked. Make responses audible and clear.`
              },
              {
                role: "user",
                content: userInput
              }
            ],
            max_tokens: 200,
            temperature: 0.7
          },
          {
            headers: {
              'Authorization': `Bearer ${api.token}`,
              'Content-Type': 'application/json'
            },
            timeout: 10000
          }
        );
      } else {
        // Hugging Face Inference APIs
        response = await axios.post(
          api.url,
          {
            inputs: `Farmer: ${userInput}\nAgricultural Assistant:`,
            parameters: {
              max_length: 150,
              temperature: 0.7,
              do_sample: true
            }
          },
          {
            headers: {
              'Authorization': `Bearer ${api.token}`,
              'Content-Type': 'application/json'
            },
            timeout: 8000
          }
        );
      }

      let aiVoiceReply = '';
      if (api.name === 'Hugging Face Router') {
        if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
          aiVoiceReply = response.data.choices[0].message.content;
        }
      } else {
        // Hugging Face Inference
        if (response.data && response.data[0] && response.data[0].generated_text) {
          aiVoiceReply = response.data[0].generated_text.replace('Agricultural Assistant:', '').trim();
        }
      }

      if (aiVoiceReply && aiVoiceReply.length > 10) {
        console.log(`✅ ${api.name} Voice API Success:`, aiVoiceReply);
        return res.status(200).json({ reply: aiVoiceReply, language, ai: true, api: api.name });
      }
    } catch (error) {
      console.log(`❌ ${api.name} Voice API failed:`, error.message);
      continue; // Try next API
    }
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

