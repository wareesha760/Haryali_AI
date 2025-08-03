const axios = require('axios');

const askChatGPT = async (req, res) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: "No user input provided." });
  }

  try {
    // More specific and contextual prompt
    const systemPrompt = `You are an expert agricultural assistant for Pakistani farmers. 
    
    IMPORTANT: Always provide specific, actionable answers to the user's exact question. 
    Do NOT give generic advice unless the question is very general.
    
    Guidelines:
    1. Answer the specific question asked, not a general topic
    2. If asked about a specific crop, provide details about that crop
    3. If asked about weather, give specific weather advice
    4. If asked about pests, provide specific pest control methods
    5. If asked about equipment, give specific equipment advice
    6. Use the same language as the user's question (Urdu or English)
    7. Keep responses concise but detailed enough to be helpful
    8. If you don't know something specific, say so rather than giving generic advice
    
    User's question: "${userInput}"
    
    Provide a specific answer to this exact question.`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: systemPrompt
          },
          { 
            role: "user", 
            content: `Please answer this specific question: ${userInput}` 
          }
        ],
        max_tokens: 400,
        temperature: 0.3 // Lower temperature for more focused responses
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.status(200).json({ reply });

  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    
    // More specific fallback responses based on keywords
    const fallbackResponses = {
      "wheat": "گندم کی کاشت کے لیے نومبر سے دسمبر کا وقت بہترین ہے۔ پانی کی مناسب مقدار دیں اور کھاد کا استعمال کریں۔",
      "rice": "چاول کی کاشت کے لیے مئی سے جون کا وقت مناسب ہے۔ پانی کی زیادہ مقدار کی ضرورت ہوتی ہے۔",
      "cotton": "کپاس کی کاشت فروری سے مارچ میں کریں۔ کیڑوں سے بچاؤ کے لیے مناسب دوائی کا استعمال کریں۔",
      "sugarcane": "گنے کی کاشت فروری سے مارچ میں کریں۔ پانی کی زیادہ مقدار دیں۔",
      "maize": "مکئی کی کاشت مارچ سے اپریل میں کریں۔ کھاد کا مناسب استعمال کریں۔",
      "weather": "آج کا موسم کھیتی کے لیے اچھا ہے۔ پانی کا خیال رکھیں اور ضرورت پڑنے پر سایہ کریں۔",
      "pest": "کیڑوں سے بچاؤ کے لیے مناسب دوائی کا استعمال کریں۔ کیمیائی دوائیوں کے ساتھ قدرتی طریقے بھی استعمال کریں۔",
      "water": "پانی کی بچت کے لیے ڈرپ ایریگیشن استعمال کریں۔ صبح یا شام کو پانی دیں۔",
      "fertilizer": "کھاد کا استعمال موسم اور فصل کے مطابق کریں۔ NPK کھاد کا مناسب تناسب استعمال کریں۔",
      "harvest": "فصل کی کٹائی کے لیے مناسب وقت کا انتظار کریں۔ خشک موسم میں کٹائی کریں۔",
      "tractor": "ٹریکٹر کا استعمال کھیتی کے لیے ضروری ہے۔ مناسب HP کا ٹریکٹر استعمال کریں۔",
      "seed": "اچھے بیج کا انتخاب کریں۔ بیماری سے پاک بیج استعمال کریں۔",
      "soil": "مٹی کی جانچ کریں۔ pH لیول 6.5 سے 7.5 کے درمیان ہونا چاہیے۔",
      "disease": "پودوں کی بیماریوں سے بچاؤ کے لیے مناسب دوائی کا استعمال کریں۔ صفائی کا خیال رکھیں۔",
      "market": "فصل کی قیمت مارکیٹ میں چیک کریں۔ مناسب وقت پر فروخت کریں۔"
    };

    // More sophisticated keyword matching
    const lowerInput = userInput.toLowerCase();
    let fallbackReply = "معذرت، میں آپ کی بات نہیں سمجھ سکا۔ براہ کرم اپنا سوال واضح طور پر پوچھیں۔";

    // Check for specific keywords and provide relevant answers
    for (const [keyword, response] of Object.entries(fallbackResponses)) {
      if (lowerInput.includes(keyword)) {
        fallbackReply = response;
        break;
      }
    }

    // If no specific keyword found, try to provide a more helpful response
    if (fallbackReply === "معذرت، میں آپ کی بات نہیں سمجھ سکا۔ براہ کرم اپنا سوال واضح طور پر پوچھیں۔") {
      if (lowerInput.includes("کیسے") || lowerInput.includes("how")) {
        fallbackReply = "آپ کا سوال واضح نہیں ہے۔ براہ کرم بتائیں کہ آپ کس فصل یا مسئلے کے بارے میں پوچھ رہے ہیں۔";
      } else if (lowerInput.includes("کب") || lowerInput.includes("when")) {
        fallbackReply = "وقت کے بارے میں پوچھ رہے ہیں۔ براہ کرم بتائیں کہ کس کام کا وقت جاننا چاہتے ہیں۔";
      } else if (lowerInput.includes("کیا") || lowerInput.includes("what")) {
        fallbackReply = "آپ کیا جاننا چاہتے ہیں؟ براہ کرم اپنا سوال واضح کریں۔";
      }
    }

    res.status(200).json({ reply: fallbackReply });
  }
};

// Handle voice-specific queries
const handleVoiceQuery = async (req, res) => {
  const { userInput, language = 'en' } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: "No voice input provided." });
  }

  try {
    const systemPrompt = `You are an agricultural voice assistant for Pakistani farmers. 
    
    IMPORTANT: Provide specific, actionable answers to the user's exact question.
    Respond in ${language === 'ur' ? 'Urdu' : 'English'} with clear, spoken-friendly language.
    Keep responses short but specific to the question asked.
    
    User's voice question: "${userInput}"
    
    Give a specific answer to this exact question.`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: systemPrompt
          },
          { 
            role: "user", 
            content: `Answer this specific question: ${userInput}` 
          }
        ],
        max_tokens: 250,
        temperature: 0.3
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.status(200).json({ reply, language });

  } catch (error) {
    console.error("Voice API Error:", error);
    const fallbackReply = language === 'ur' 
      ? "آپ کی آواز سننے میں مسئلہ ہوا۔ براہ کرم دوبارہ کوشش کریں۔"
      : "I couldn't understand your voice. Please try again.";
    
    res.status(200).json({ reply: fallbackReply, language });
  }
};

module.exports = { askChatGPT, handleVoiceQuery };

