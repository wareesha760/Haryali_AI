const express = require('express');
const router = express.Router();
const { calculateFertilizer, getCropData } = require('../controllers/fertilizerController');

// Get crop data (crops, stages, soils, fertilizers)
router.get('/data', getCropData);

// Calculate fertilizer requirements
router.post('/calculate', calculateFertilizer);

module.exports = router; 