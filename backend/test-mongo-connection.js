const mongoose = require('mongoose');
require('dotenv').config();

// Test MongoDB connection
async function testConnection() {
  try {
    console.log('🔗 Testing MongoDB connection...');
    
    // Use your connection string here
    const mongoUri = 'mongodb+srv://Haryali-AI:Haryali-AI@haryali-ai-cluster.oomvpqn.mongodb.net/kisaan-bot?retryWrites=true&w=majority&appName=Haryali-AI-cluster';
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully!');
    console.log('🌾 Your database is ready for Kisaan Bot!');
    
    // Test creating a simple collection
    const testCollection = mongoose.connection.collection('test');
    await testCollection.insertOne({ test: 'connection', timestamp: new Date() });
    console.log('✅ Database write test successful!');
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your password is correct');
    console.log('2. Make sure you added /kisaan-bot to the URL');
    console.log('3. Verify your IP is whitelisted (0.0.0.0/0)');
    console.log('4. Check your username is correct');
  }
}

testConnection();
