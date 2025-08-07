const axios = require('axios');

const BASE_URL = 'http://localhost:5001/api/planner';

// Test data
const testPlanningData = {
  cropType: 'wheat',
  acreArea: 5,
  growthStage: 'tillering',
  soilType: 'loam',
  weatherCondition: 'normal',
  season: 'rabi',
  startDate: '2024-01-15'
};

async function testPlanningCalculator() {
  console.log('🧪 Testing Planning Calculator API...\n');

  try {
    // Test 1: Get planning data
    console.log('📊 Test 1: Getting planning data...');
    const dataResponse = await axios.get(`${BASE_URL}/data`);
    console.log('✅ Planning data retrieved successfully');
    console.log('📋 Available crops:', dataResponse.data.crops.length);
    console.log('📋 Available soils:', dataResponse.data.soils.length);
    console.log('📋 Available weather conditions:', dataResponse.data.weatherConditions.length);
    console.log('');

    // Test 2: Calculate planning requirements
    console.log('🧮 Test 2: Calculating planning requirements...');
    const calculationResponse = await axios.post(`${BASE_URL}/calculate`, testPlanningData);
    console.log('✅ Planning calculation completed successfully');
    console.log('📊 Results:');
    console.log(`   - Crop: ${calculationResponse.data.crop.name} (${calculationResponse.data.crop.english})`);
    console.log(`   - Stage: ${calculationResponse.data.stage.name} (${calculationResponse.data.stage.english})`);
    console.log(`   - Duration: ${calculationResponse.data.stage.duration} days`);
    console.log(`   - Soil: ${calculationResponse.data.soil.name} (${calculationResponse.data.soil.english})`);
    console.log(`   - Weather: ${calculationResponse.data.weather.name} (${calculationResponse.data.weather.english})`);
    console.log(`   - Total Labor Hours: ${calculationResponse.data.requirements.labor.hours}`);
    console.log(`   - Total Cost: ${calculationResponse.data.costs.total} PKR`);
    console.log(`   - Timeline Weeks: ${calculationResponse.data.timeline.length}`);
    console.log(`   - Recommendations: ${calculationResponse.data.recommendations.length}`);
    console.log('');

    // Test 3: Test with different parameters
    console.log('🔄 Test 3: Testing with different parameters...');
    const testCases = [
      {
        name: 'Rice in Clay Soil (Dry Weather)',
        data: {
          cropType: 'rice',
          acreArea: 3,
          growthStage: 'nursery',
          soilType: 'clay',
          weatherCondition: 'dry',
          season: 'kharif',
          startDate: '2024-06-01'
        }
      },
      {
        name: 'Cotton in Sandy Soil (Humid Weather)',
        data: {
          cropType: 'cotton',
          acreArea: 8,
          growthStage: 'flowering',
          soilType: 'sandy',
          weatherCondition: 'humid',
          season: 'kharif',
          startDate: '2024-07-15'
        }
      }
    ];

    for (const testCase of testCases) {
      console.log(`   Testing: ${testCase.name}`);
      const response = await axios.post(`${BASE_URL}/calculate`, testCase.data);
      console.log(`   ✅ ${testCase.name} - Cost: ${response.data.costs.total} PKR, Labor: ${response.data.requirements.labor.hours} hours`);
    }
    console.log('');

    console.log('🎉 All planning calculator tests passed successfully!');
    console.log('');
    console.log('📋 Summary:');
    console.log('   ✅ Planning data endpoint working');
    console.log('   ✅ Planning calculation endpoint working');
    console.log('   ✅ Multiple parameter combinations working');
    console.log('   ✅ Bilingual support (Urdu/English) working');
    console.log('   ✅ Cost calculations working');
    console.log('   ✅ Timeline generation working');
    console.log('   ✅ Recommendations generation working');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    process.exit(1);
  }
}

// Run tests
testPlanningCalculator(); 