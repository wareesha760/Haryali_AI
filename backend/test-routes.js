console.log('Testing planner routes...');

try {
  const plannerRoutes = require('./routes/planner');
  console.log('✅ Planner routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading planner routes:', error);
} 