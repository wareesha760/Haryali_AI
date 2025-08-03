const express = require("express");
const router = express.Router();
const { askChatGPT, handleVoiceQuery } = require("../controllers/chatController");

router.post("/ask", askChatGPT);
router.post("/voice", handleVoiceQuery);

module.exports = router;
