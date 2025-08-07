// Direct test of planning calculator functions
const { calculatePlanning, getPlanningData } = require('./controllers/planner.controller');

console.log('🧪 Testing Planning Calculator Directly...\n');

// Test 1: Test getPlanningData function
console.log('📊 Test 1: Testing getPlanningData function...');
try {
  // Mock request and response objects
  const mockReq = {};
  const mockRes = {
    status: (code) => {
      console.log(`Response status: ${code}`);
      return mockRes;
    },
    json: (data) => {
      console.log('✅ getPlanningData function works!');
      console.log('📋 Available crops:', data.crops.length);
      console.log('📋 Available soils:', data.soils.length);
      console.log('📋 Available weather conditions:', data.weatherConditions.length);
      console.log('');
    }
  };
  
  getPlanningData(mockReq, mockRes);
} catch (error) {
  console.error('❌ Error in getPlanningData:', error);
}

// Test 2: Test calculatePlanning function
console.log('🧮 Test 2: Testing calculatePlanning function...');
try {
  const testData = {
    cropType: 'wheat',
    acreArea: 5,
    growthStage: 'tillering',
    soilType: 'loam',
    weatherCondition: 'normal',
    season: 'rabi',
    startDate: '2024-01-15'
  };
  
  const mockReq = { body: testData };
  const mockRes = {
    status: (code) => {
      console.log(`Response status: ${code}`);
      return mockRes;
    },
    json: (data) => {
      console.log('✅ calculatePlanning function works!');
      console.log('📊 Results:');
      console.log(`   - Crop: ${data.crop.name} (${data.crop.english})`);
      console.log(`   - Stage: ${data.stage.name} (${data.stage.english})`);
      console.log(`   - Duration: ${data.stage.duration} days`);
      console.log(`   - Total Labor Hours: ${data.requirements.labor.hours}`);
      console.log(`   - Total Cost: ${data.costs.total} PKR`);
      console.log(`   - Timeline Weeks: ${data.timeline.length}`);
      console.log(`   - Recommendations: ${data.recommendations.length}`);
      console.log('');
    }
  };
  
  calculatePlanning(mockReq, mockRes);
} catch (error) {
  console.error('❌ Error in calculatePlanning:', error);
}

console.log('🎉 Direct testing completed!'); 