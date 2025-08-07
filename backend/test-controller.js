console.log('Testing planner controller...');

try {
  const plannerController = require('./controllers/planner.controller');
  console.log('✅ Planner controller loaded successfully');
  console.log('Available functions:', Object.keys(plannerController));
} catch (error) {
  console.error('❌ Error loading planner controller:', error);
} 