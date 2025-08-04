const axios = require('axios');
require('dotenv').config();

// Test the reliable AI APIs
async function testAPIs() {
  const testInput = "How to grow wheat in Pakistan?";
  
  console.log('🧪 Testing reliable AI APIs with input:', testInput);
  
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

  for (let i = 0; i < AI_APIS.length; i++) {
    const api = AI_APIS[i];
    try {
      console.log(`\n🤖 Testing ${api.name}...`);
      
      let response;
      if (api.name === 'Hugging Face Router') {
        response = await axios.post(
          api.url,
          {
            model: api.model,
            messages: [
              {
                role: "system",
                content: "You are an expert agricultural assistant for Pakistani farmers. Provide specific, actionable answers in the same language as the user's question (Urdu or English). Focus on farming, crops, weather, pests, water management, and agricultural practices. Keep responses clear and audible."
              },
              {
                role: "user",
                content: testInput
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
            inputs: `Farmer: ${testInput}\nAgricultural Assistant:`,
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
        console.log(`✅ ${api.name} SUCCESS:`);
        console.log(`Response: ${aiReply}`);
        console.log(`Length: ${aiReply.length} characters`);
        return true;
      } else {
        console.log(`❌ ${api.name} FAILED: No valid response`);
      }
    } catch (error) {
      console.log(`❌ ${api.name} ERROR:`, error.message);
      if (error.response) {
        console.log('Error details:', error.response.data);
      }
    }
  }
  
  console.log('\n❌ All APIs failed. Using fallback responses.');
  return false;
}

// Run the test
testAPIs().then(success => {
  if (success) {
    console.log('\n🎉 API test completed successfully!');
  } else {
    console.log('\n⚠️ API test failed, but fallback system will work.');
  }
}).catch(error => {
  console.error('Test error:', error);
}); 