const express = require('express');
const router = express.Router();
const { askChatGPT } = require('../controllers/chatController');

// Route to handle user chat
router.post('/ask', askChatGPT);

module.exports = router;
