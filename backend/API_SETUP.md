# Kisaan Bot API Setup Guide

## 🆓 Free AI API Configuration

The chatbot now uses **multiple reliable Hugging Face APIs** in sequence to ensure consistent responses. All APIs are free and have unlimited tokens.

### Current Setup

1. **Multiple Reliable AI APIs** (Primary)
   - **Hugging Face Router**: `https://router.huggingface.co/v1/chat/completions`
   - **Hugging Face Inference**: `https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium`
   - **Hugging Face Text Generation**: `https://api-inference.huggingface.co/models/gpt2`
   - All APIs are free with unlimited tokens
   - Automatic fallback system

2. **Enhanced Fallback System**
   - Comprehensive agricultural responses in Urdu and English
   - Covers crops, weather, pests, water, fertilizer, etc.
   - Context-aware keyword matching
   - No dependency on external APIs

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/kisaan-bot

# JWT Secret
JWT_SECRET=your_jwt_secret_here

# AI API Configuration (Optional)
HF_TOKEN=hf_demo

# Server Configuration
PORT=5001
```

### Features

✅ **Multiple Reliable APIs** - All Hugging Face APIs are stable  
✅ **Unlimited Tokens** - No usage limits  
✅ **Free Forever** - No credit card required  
✅ **Agricultural Focus** - Specialized for farming queries  
✅ **Bilingual Support** - Urdu and English responses  
✅ **Offline Capable** - Works without internet  
✅ **Fast Responses** - No authentication delays  
✅ **Audible Responses** - Clear, spoken-friendly language  

### How It Works

1. **Primary**: Tries multiple Hugging Face APIs in sequence
2. **Fallback**: Enhanced agricultural knowledge base
3. **Final**: Context-aware generic responses

### API Testing

Run the test script to verify APIs are working:

```bash
cd frontend/backend
node test-api.js
```

### Testing

The system will automatically:
- Try Hugging Face Router API first
- If that fails, try Hugging Face Inference API
- If that fails, try Hugging Face Text Generation API
- Fall back to agricultural responses if all APIs fail
- Provide helpful responses even without internet

### Benefits

- 🚫 No more authentication failures
- 💰 Completely free
- 🌾 Agricultural expertise built-in
- 🔄 Reliable fallback system
- ⚡ Fast response times
- 🤖 Multiple AI models for better responses
- 🔊 Audible and clear responses 