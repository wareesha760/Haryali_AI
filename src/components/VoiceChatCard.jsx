import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import botImg from "../assets/chatbot.jpg";
import farmerImg from "../assets/farmer.png";
import axios from "axios";

const VoiceChatCard = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "ہیلو! میں آپ کی زرعی مدد کے لیے حاضر ہوں۔ آپ اپنی بات کریں یا ٹیکسٹ لکھیں۔" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize Web Speech API - Fixed dependency issue
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US'; // Can be changed to 'ur-PK' for Urdu

      recognitionRef.current.onstart = () => {
        console.log('🎤 Speech recognition started');
        setIsListening(true);
        setTranscript("");
        setFinalTranscript("");
        setMessages((prev) => [...prev, { 
          type: "bot", 
          text: "🎤 مائیک فعال ہے... بات کریں" 
        }]);
      };

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Update the final transcript when we get final results
        if (finalTranscript) {
          setFinalTranscript(finalTranscript);
          console.log('✅ Final transcript captured:', finalTranscript);
        }

        // Show interim results for live feedback
        const currentTranscript = finalTranscript || interimTranscript;
        setTranscript(currentTranscript);
        console.log('📝 Current transcript:', currentTranscript);
        
        // If we have a final transcript, store it immediately
        if (finalTranscript) {
          // Store the final transcript in a ref for immediate access
          recognitionRef.current.finalTranscript = finalTranscript;
        }
      };

      recognitionRef.current.onend = () => {
        console.log('🛑 Speech recognition ended');
        setIsListening(false);
        setIsRecording(false);
        
        // Add a small delay to ensure final transcript is captured
        setTimeout(() => {
          // Get the final transcript from multiple sources
          const storedFinalTranscript = recognitionRef.current.finalTranscript;
          const textToProcess = storedFinalTranscript || finalTranscript || transcript;
          console.log('🔍 Checking for transcript to process:', { 
            storedFinalTranscript, 
            finalTranscript, 
            transcript, 
            textToProcess 
          });
          
          if (textToProcess && textToProcess.trim()) {
            console.log('🔄 Processing voice message:', textToProcess);
            handleVoiceMessage(textToProcess);
          } else {
            console.log('❌ No transcript to process');
            setMessages((prev) => [...prev, { 
              type: "bot", 
              text: "آواز نہیں سنی گئی۔ براہ کرم واضح طور پر بات کریں۔" 
            }]);
          }
          
          // Clear transcripts after processing
          setTranscript("");
          setFinalTranscript("");
          if (recognitionRef.current) {
            recognitionRef.current.finalTranscript = null;
          }
        }, 100); // Small delay to ensure transcript is captured
      };

      recognitionRef.current.onerror = (event) => {
        console.error('❌ Speech recognition error:', event.error);
        setIsListening(false);
        setIsRecording(false);
        
        let errorMessage = "وائس ریکگنیشن میں مسئلہ ہوا۔";
        
        // Show user-friendly error message
        switch(event.error) {
          case 'not-allowed':
            errorMessage = "مائیک کی اجازت نہیں ملی۔ براہ کرم مائیک کی اجازت دیں اور دوبارہ کوشش کریں۔";
            break;
          case 'no-speech':
            errorMessage = "آواز نہیں سنی گئی۔ براہ کرم واضح طور پر بات کریں۔";
            break;
          case 'audio-capture':
            errorMessage = "مائیک تک رسائی نہیں مل سکی۔ براہ کرم مائیک چیک کریں۔";
            break;
          case 'network':
            errorMessage = "نیٹ ورک مسئلہ۔ براہ کرم انٹرنیٹ کنکشن چیک کریں۔";
            break;
          default:
            errorMessage = `وائس ریکگنیشن میں مسئلہ: ${event.error}`;
        }
        
        setMessages((prev) => [...prev, { 
          type: "bot", 
          text: errorMessage 
        }]);
        
        // Clear transcripts on error
        setTranscript("");
        setFinalTranscript("");
      };
    } else {
      console.log('❌ Speech recognition not supported');
      setMessages((prev) => [...prev, { 
        type: "bot", 
        text: "آپ کے براؤزر میں وائس ریکگنیشن سپورٹ نہیں ہے۔ براہ کرم Chrome یا Edge استعمال کریں۔" 
      }]);
    }

    // Initialize Text-to-Speech
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
      console.log('✅ Speech synthesis initialized');
    } else {
      console.log('❌ Speech synthesis not supported');
    }
  }, []); // Removed transcript dependency

  const handleVoiceMessage = async (voiceText) => {
    if (!voiceText.trim()) return;

    console.log('🔄 Handling voice message:', voiceText);

    // Add user voice message
    setMessages((prev) => [...prev, { type: "user", text: voiceText, isVoice: true }]);

    try {
      // Send to backend for AI response
      const res = await axios.post("http://localhost:5001/api/chat/ask", {
        userInput: voiceText,
      });

      const botReply = res.data.reply || "I couldn't understand. Please try again.";

      // Add bot response
      setMessages((prev) => [...prev, { type: "bot", text: botReply }]);

      // Speak the bot response
      speakText(botReply);

    } catch (err) {
      console.error("❌ API Error:", err.message);
      const errorMessage = "Sorry, I couldn't process your request. Please try again.";
      setMessages((prev) => [...prev, { type: "bot", text: errorMessage }]);
      speakText(errorMessage);
    }
  };

  const speakText = (text) => {
    if (synthesisRef.current) {
      // Stop any current speech
      synthesisRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Can be changed to 'ur-PK' for Urdu
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      synthesisRef.current.speak(utterance);
      console.log('🔊 Speaking:', text);
    } else {
      console.log('❌ Speech synthesis not available');
    }
  };

  const handleSendText = async () => {
    if (inputText.trim() === "") return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: inputText }]);
    const userMessage = inputText;
    setInputText("");

    try {
      // Send to backend
      const res = await axios.post("http://localhost:5001/api/chat/ask", {
        userInput: userMessage,
      });

      const botReply = res.data.reply || "I couldn't understand. Please try again.";

      // Add bot response
      setMessages((prev) => [...prev, { type: "bot", text: botReply }]);

      // Speak the response
      speakText(botReply);

    } catch (err) {
      console.error("❌ API Error:", err.message);
      const errorMessage = "Sorry, I couldn't process your request. Please try again.";
      setMessages((prev) => [...prev, { type: "bot", text: errorMessage }]);
      speakText(errorMessage);
    }
  };

  const startVoiceRecording = () => {
    if (recognitionRef.current && !isListening) {
      try {
        console.log('🎤 Starting voice recording...');
        recognitionRef.current.start();
        setIsRecording(true);
        
        // Add a timeout to prevent premature ending
        setTimeout(() => {
          if (isListening && !finalTranscript.trim()) {
            console.log('⏰ Speech recognition timeout - no final transcript');
            recognitionRef.current.stop();
          }
        }, 10000); // 10 second timeout
        
      } catch (error) {
        console.error('❌ Error starting speech recognition:', error);
        setMessages((prev) => [...prev, { 
          type: "bot", 
          text: "وائس ریکگنیشن شروع کرنے میں مسئلہ ہوا۔ براہ کرم دوبارہ کوشش کریں۔" 
        }]);
      }
    } else {
      console.log('❌ Speech recognition not available or already listening');
      setMessages((prev) => [...prev, { 
        type: "bot", 
        text: "وائس ریکگنیشن دستیاب نہیں ہے۔" 
      }]);
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsRecording(false);
      console.log('🛑 Stopping voice recording...');
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopVoiceRecording();
    } else {
      startVoiceRecording();
    }
  };

  // Manual transcript processing
  const processCurrentTranscript = () => {
    const textToProcess = finalTranscript || transcript;
    if (textToProcess && textToProcess.trim()) {
      console.log('🔄 Manually processing transcript:', textToProcess);
      handleVoiceMessage(textToProcess);
      setTranscript("");
      setFinalTranscript("");
    } else {
      console.log('❌ No transcript to process manually');
    }
  };

  // Test microphone access manually
  const testMicrophone = async () => {
    try {
      console.log('🎤 Testing microphone access...');
      setMessages((prev) => [...prev, { 
        type: "bot", 
        text: "🎤 مائیک ٹیسٹ کر رہا ہے..." 
      }]);
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('✅ Microphone access granted');
      stream.getTracks().forEach(track => track.stop());
      
      setMessages((prev) => [...prev, { 
        type: "bot", 
        text: "✅ مائیک کام کر رہا ہے! اب وائس ریکگنیشن آزمائیں۔" 
      }]);
      
      // Test speech recognition briefly
      if (recognitionRef.current) {
        setTimeout(() => {
          try {
            recognitionRef.current.start();
            setTimeout(() => {
              if (recognitionRef.current) {
                recognitionRef.current.stop();
              }
            }, 3000); // Test for 3 seconds
          } catch (error) {
            console.error('❌ Speech recognition test failed:', error);
          }
        }, 1000);
      }
      
    } catch (error) {
      console.error('❌ Microphone access denied:', error);
      setMessages((prev) => [...prev, { 
        type: "bot", 
        text: `❌ مائیک تک رسائی نہیں ملی: ${error.message}. براہ کرم مائیک کی اجازت دیں۔` 
      }]);
    }
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
                <span>{msg.text}</span>
                {msg.isVoice && (
                  <div className="text-xs text-gray-500 mt-1">🎤 Voice message</div>
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
          
          {/* Live transcript display */}
          {isListening && transcript && (
            <div className="flex justify-start">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 rounded-bl-none max-w-[70%]">
                <span>{transcript}</span>
                <div className="text-xs text-gray-500 mt-1">🎤 Listening...</div>
              </div>
            </div>
          )}

          {isRecording && !transcript && (
            <div className="text-center text-red-600 font-semibold pt-2">
              🎤 مائیک استعمال ہو رہا ہے... بات کریں
            </div>
          )}
          
          {/* Recording indicator */}
          {isRecording && (
            <div className="flex justify-center items-center space-x-2 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
              <span className="text-sm text-red-600">Recording...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* ✅ Input */}
        <div className="p-4 border-t border-gray-300 flex items-center gap-3 bg-white/70 backdrop-blur-lg">
          <motion.button
            onClick={handleMicClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full transition-all duration-300 ${
              isRecording 
                ? "bg-red-500 text-white animate-pulse shadow-lg" 
                : "bg-green-600 text-white hover:bg-green-700 shadow-md"
            }`}
            title={isRecording ? "Stop recording" : "Start voice recording"}
          >
            {isRecording ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 6h12v12H6z"/>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                <path d="M19 10v2a7 7 0 01-14 0v-2h-2v2A9 9 0 0012 21a9 9 0 009-9v-2h-2z" />
              </svg>
            )}
          </motion.button>
          
          {/* Manual stop button when recording */}
          {isRecording && (
            <motion.button
              onClick={stopVoiceRecording}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              title="Stop recording"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
          
          {/* Manual process button when transcript is available */}
          {!isRecording && (transcript || finalTranscript) && (
            <motion.button
              onClick={processCurrentTranscript}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              title="Process transcript"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.button>
          )}
          
          <input
            type="text"
            placeholder="بات کریں یا ٹیکسٹ لکھیں"
            className="flex-1 p-3 rounded-full bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendText()}
          />
          <motion.button
            onClick={handleSendText}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default VoiceChatCard;
