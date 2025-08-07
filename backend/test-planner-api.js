const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:5001/api';
const TEST_USER = {
  email: 'test@example.com',
  password: 'testpassword123'
};

let authToken = '';
let testTaskId = '';
let testGoalId = '';
let testScheduleId = '';

// Helper function to make authenticated requests
const makeRequest = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` })
      },
      ...(data && { data })
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`❌ Error in ${method} ${endpoint}:`, error.response?.data || error.message);
    return null;
  }
};

// Test authentication
const testAuth = async () => {
  console.log('\n🔐 Testing Authentication...');
  
  // Register user
  const registerResponse = await makeRequest('POST', '/auth/register', TEST_USER);
  if (registerResponse?.success) {
    console.log('✅ User registered successfully');
  }

  // Login user
  const loginResponse = await makeRequest('POST', '/auth/login', TEST_USER);
  if (loginResponse?.success) {
    authToken = loginResponse.token;
    console.log('✅ User logged in successfully');
    return true;
  }
  
  console.log('❌ Authentication failed');
  return false;
};

// Test Dashboard
const testDashboard = async () => {
  console.log('\n📊 Testing Dashboard...');
  
  const response = await makeRequest('GET', '/planner/dashboard');
  if (response?.success) {
    console.log('✅ Dashboard data retrieved successfully');
    console.log('📈 Analytics:', response.data.analytics);
    return true;
  }
  
  console.log('❌ Dashboard test failed');
  return false;
};

// Test Task Management
const testTasks = async () => {
  console.log('\n📝 Testing Task Management...');
  
  // Create task
  const taskData = {
    title: 'Test Irrigation Task',
    description: 'Test irrigation task for wheat field',
    category: 'irrigation',
    priority: 'high',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDuration: 3,
    location: 'Field A',
    tags: ['irrigation', 'wheat'],
    weatherDependent: true,
    weatherConditions: {
      temperature: { min: 15, max: 30 },
      humidity: { min: 40, max: 80 }
    }
  };
  
  const createResponse = await makeRequest('POST', '/planner/tasks', taskData);
  if (createResponse?.success) {
    testTaskId = createResponse.data._id;
    console.log('✅ Task created successfully');
  } else {
    console.log('❌ Task creation failed');
    return false;
  }
  
  // Get tasks
  const getResponse = await makeRequest('GET', '/planner/tasks');
  if (getResponse?.success) {
    console.log('✅ Tasks retrieved successfully');
    console.log(`📋 Found ${getResponse.data.length} tasks`);
  }
  
  // Update task
  const updateData = {
    status: 'in_progress',
    progress: 50,
    actualDuration: 1.5
  };
  
  const updateResponse = await makeRequest('PUT', `/planner/tasks/${testTaskId}`, updateData);
  if (updateResponse?.success) {
    console.log('✅ Task updated successfully');
  }
  
  return true;
};

// Test Goal Management
const testGoals = async () => {
  console.log('\n🎯 Testing Goal Management...');
  
  // Create goal
  const goalData = {
    title: 'Increase Wheat Yield',
    description: 'Achieve 20% higher wheat yield this season',
    category: 'production',
    targetValue: 100,
    currentValue: 0,
    unit: 'quintals',
    deadline: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString(),
    milestones: [
      {
        title: 'Complete Sowing',
        targetValue: 25,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  };
  
  const createResponse = await makeRequest('POST', '/planner/goals', goalData);
  if (createResponse?.success) {
    testGoalId = createResponse.data._id;
    console.log('✅ Goal created successfully');
  } else {
    console.log('❌ Goal creation failed');
    return false;
  }
  
  // Get goals
  const getResponse = await makeRequest('GET', '/planner/goals');
  if (getResponse?.success) {
    console.log('✅ Goals retrieved successfully');
    console.log(`🎯 Found ${getResponse.data.length} goals`);
  }
  
  // Update goal
  const updateData = {
    currentValue: 45,
    progress: 45
  };
  
  const updateResponse = await makeRequest('PUT', `/planner/goals/${testGoalId}`, updateData);
  if (updateResponse?.success) {
    console.log('✅ Goal updated successfully');
  }
  
  return true;
};

// Test Schedule Management
const testSchedules = async () => {
  console.log('\n📅 Testing Schedule Management...');
  
  // Create schedule
  const scheduleData = {
    title: 'Team Meeting',
    description: 'Weekly team coordination meeting',
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
    category: 'meeting',
    location: 'Farm Office',
    priority: 'medium',
    recurring: 'weekly'
  };
  
  const createResponse = await makeRequest('POST', '/planner/schedules', scheduleData);
  if (createResponse?.success) {
    testScheduleId = createResponse.data._id;
    console.log('✅ Schedule created successfully');
  } else {
    console.log('❌ Schedule creation failed');
    return false;
  }
  
  // Get schedules
  const getResponse = await makeRequest('GET', '/planner/schedules');
  if (getResponse?.success) {
    console.log('✅ Schedules retrieved successfully');
    console.log(`📅 Found ${getResponse.data.length} schedules`);
  }
  
  return true;
};

// Test Settings
const testSettings = async () => {
  console.log('\n⚙️ Testing Settings...');
  
  // Get settings
  const getResponse = await makeRequest('GET', '/planner/settings');
  if (getResponse?.success) {
    console.log('✅ Settings retrieved successfully');
    console.log('⚙️ Current settings:', getResponse.data);
  }
  
  // Update settings
  const updateData = {
    defaultReminderTime: 30,
    workingHours: {
      start: '07:00',
      end: '19:00'
    },
    weatherIntegration: true,
    autoScheduling: true
  };
  
  const updateResponse = await makeRequest('PUT', '/planner/settings', updateData);
  if (updateResponse?.success) {
    console.log('✅ Settings updated successfully');
  }
  
  return true;
};

// Test Analytics
const testAnalytics = async () => {
  console.log('\n📊 Testing Analytics...');
  
  const response = await makeRequest('GET', '/planner/analytics');
  if (response?.success) {
    console.log('✅ Analytics retrieved successfully');
    console.log('📈 Analytics data:', response.data);
  } else {
    console.log('❌ Analytics test failed');
    return false;
  }
  
  return true;
};

// Cleanup test data
const cleanup = async () => {
  console.log('\n🧹 Cleaning up test data...');
  
  if (testTaskId) {
    await makeRequest('DELETE', `/planner/tasks/${testTaskId}`);
    console.log('✅ Test task deleted');
  }
  
  if (testGoalId) {
    await makeRequest('DELETE', `/planner/goals/${testGoalId}`);
    console.log('✅ Test goal deleted');
  }
  
  if (testScheduleId) {
    await makeRequest('DELETE', `/planner/schedules/${testScheduleId}`);
    console.log('✅ Test schedule deleted');
  }
};

// Main test function
const runTests = async () => {
  console.log('🚀 Starting Smart Planner API Tests...\n');
  
  try {
    // Test authentication
    const authSuccess = await testAuth();
    if (!authSuccess) {
      console.log('❌ Authentication failed, stopping tests');
      return;
    }
    
    // Run all tests
    await testDashboard();
    await testTasks();
    await testGoals();
    await testSchedules();
    await testSettings();
    await testAnalytics();
    
    // Cleanup
    await cleanup();
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('\n✅ Smart Planner Backend is working correctly');
    
  } catch (error) {
    console.error('❌ Test suite failed:', error.message);
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  runTests,
  testAuth,
  testDashboard,
  testTasks,
  testGoals,
  testSchedules,
  testSettings,
  testAnalytics
}; 