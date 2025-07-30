import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import botImg from "../assets/chatbot.jpg";
import farmerImg from "../assets/farmer.png";
import axios from "axios";




const VoiceChatCard = () => {
  const [messages, setMessages] = useState([
    { type: "bot", audio: true },
    { type: "user", audio: true },
  ]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendText = async () => {
  if (inputText.trim() === "") return;

  // Add user message first
  setMessages((prev) => [...prev, { type: "user", text: inputText }]);
  const userMessage = inputText;
  setInputText("");

  try {
    // Send user input to backend
    const res = await axios.post("http://localhost:5001/api/chat/ask", {
      userInput: userMessage,
    });

    const botReply = res.data.reply || " کوئی جواب نہیں ملا۔";

    // Add bot response
    setMessages((prev) => [...prev, { type: "bot", text: botReply }]);
  } catch (err) {
    console.error("API Error:", err.message);
    setMessages((prev) => [
      ...prev,
      { type: "bot", text: " سرور سے جواب نہیں ملا۔" },
    ]);
  }
};


  const handleMicClick = () => {
    setIsRecording(true);
    setMessages((prev) => [...prev, { type: "user", audio: true }]);
    setTimeout(() => {
      setIsRecording(false);
      setMessages((prev) => [...prev, { type: "bot", audio: true }]);
    }, 3000);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center pt-40 p-6 bg-transparent"
    >
      {/* ✅ Animated Ribbon */}
      <motion.div
        className="relative mb-8 inline-block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Glowing Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400 via-lime-400 to-green-500 rounded-full blur-lg opacity-40"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        {/* Glass Ribbon */}
        <motion.div
          className="relative px-8 py-3 bg-white/40 backdrop-blur-xl rounded-full shadow-xl border border-white/30"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          <h1 className="text-3xl font-extrabold text-green-800 tracking-wide">
            وائس ٹو وائس فیچر
          </h1>
        </motion.div>
      </motion.div>

      {/* ✅ Chat Card */}
      <motion.div
        className="w-full max-w-2xl h-[85vh] bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end ${
                msg.type === "bot" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.type === "bot" && (
                <div className="w-10 h-10 rounded-full overflow-hidden ml-2">
                  <img
                    src={botImg} alt="Bot" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                className={`p-3 rounded-xl max-w-[70%] ${
                  msg.type === "bot"
                    ? "bg-green-100 text-green-700 rounded-br-none"
                    : "bg-gray-100 text-blue-700 rounded-bl-none"
                }`}
              >
                {msg.audio ? (
                  <div
                    className={`audio-wave ${
                      msg.type === "bot" ? "text-green-700" : "text-blue-700"
                    }`}
                  >
                    {[...Array(15)].map((_, i) => (
                      <span key={i}></span>
                    ))}
                  </div>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
              {msg.type === "user" && (
                <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                  <img
                    src={farmerImg} alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
          {isRecording && (
            <div className="text-center text-red-600 font-semibold pt-2">
              🎤 مائیک استعمال ہو رہا ہے...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ✅ Input */}
        <div className="p-4 border-t border-gray-300 flex items-center gap-3 bg-white/70 backdrop-blur-lg">
          <button
            onClick={handleMicClick}
            className="text-green-600 hover:scale-110 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2h-2v2A9 9 0 0012 21a9 9 0 009-9v-2h-2z" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="بات کریں"
            className="flex-1 p-3 rounded-full bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendText()}
          />
        </div>
      </motion.div>

      <style>
        {`
          @keyframes wave {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(1.5); }
          }
          .audio-wave span {
            display: inline-block;
            width: 5px;
            height: 25px;
            background-color: currentColor;
            margin: 0 2px;
            animation: wave 1.2s ease-in-out infinite;
          }
          ${[...Array(15)]
            .map(
              (_, i) =>
                `.audio-wave span:nth-child(${i + 1}) { animation-delay: ${
                  i * 0.05
                }s; }`
            )
            .join("\n")}
        `}
      </style>
    </div>
  );
};

export default VoiceChatCard;
