const express = require('express');
const router = express.Router();
const { calculatePlanning, getPlanningData } = require('../controllers/planner.controller');

// Get planning data (crops, stages, soils, weather conditions)
router.get('/data', getPlanningData);

// Calculate planning requirements
router.post('/calculate', calculatePlanning);

module.exports = router; 