import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { 
  Send,
  Bot,
  User,
  Code2,
  Lightbulb,
  BookOpen,
  Zap,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw
} from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "👋 Hi there! I'm your AI coding assistant. I can help you with algorithms, data structures, debugging, and interview preparation. What would you like to work on today?",
      timestamp: new Date(Date.now() - 5000)
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickActions = [
    { icon: Code2, label: "Explain Algorithm", query: "Can you explain how binary search works?" },
    { icon: Lightbulb, label: "Debug Code", query: "Help me debug this Java code" },
    { icon: BookOpen, label: "Data Structures", query: "What's the difference between ArrayList and LinkedList?" },
    { icon: Zap, label: "Interview Prep", query: "Give me a medium-level coding problem to practice" }
  ];

  const mockResponses = [
    "That's a great question! Let me break this down for you step by step...",
    "Here's how you can approach this problem using Java:",
    "I can help you optimize this code. Here are a few suggestions:",
    "This is a classic algorithm problem. Let me show you the most efficient solution:",
    "Great thinking! Here's how you can implement this data structure:",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message = inputValue) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)] + "\n\n```java\npublic class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[] {};\n    }\n}\n```\n\nThis solution has O(n) time complexity and O(n) space complexity. Would you like me to explain any part of this code?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickAction = (query) => {
    handleSendMessage(query);
  };

  const formatMessage = (content) => {
    const parts = content.split('```');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a code block
        return (
          <div key={index} className="my-3 rounded-lg bg-[#1e1e2e] border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-[#2a2a3e] border-b border-white/10">
              <span className="text-xs text-gray-400">Java</span>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <pre className="p-3 text-sm text-gray-300 font-mono overflow-x-auto">
              <code>{part}</code>
            </pre>
          </div>
        );
      } else {
        // Regular text
        return (
          <span key={index} className="whitespace-pre-wrap">
            {part}
          </span>
        );
      }
    });
  };

  return (
    <div className="h-full flex flex-col bg-[#0A0920]">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 border-b border-white/10 bg-black/20 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-[#C724B1] to-[#3A86FF]">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Code Helper AI</h1>
              <p className="text-gray-400 text-sm">Your intelligent coding companion</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Online</span>
            </div>
            <Button variant="outline" size="sm" className="border-white/20 text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="p-4 border-b border-white/10 bg-black/10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => handleQuickAction(action.query)}
                  variant="outline"
                  className="w-full h-auto p-3 border-white/20 hover:border-[#3A86FF]/50 hover:bg-[#3A86FF]/10 transition-all duration-300 flex flex-col items-center space-y-2"
                >
                  <Icon className="w-5 h-5 text-[#3A86FF]" />
                  <span className="text-xs text-gray-300">{action.label}</span>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-4xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-[#3A86FF] to-[#5DADE2]' 
                    : 'bg-gradient-to-r from-[#C724B1] to-[#E056B7]'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message Content */}
                <div className={`flex flex-col space-y-1 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <Card className={`glass-card border-white/10 ${
                    message.type === 'user' 
                      ? 'bg-[#3A86FF]/10 border-[#3A86FF]/20' 
                      : 'bg-black/20'
                  }`}>
                    <CardContent className="p-4">
                      <div className="text-gray-300 text-sm leading-relaxed">
                        {message.type === 'bot' ? formatMessage(message.content) : message.content}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Message Actions */}
                  {message.type === 'bot' && (
                    <div className="flex items-center space-x-2 px-2">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-500 hover:text-green-400">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-500 hover:text-red-400">
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-500 hover:text-white">
                        <Copy className="w-3 h-3" />
                      </Button>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#C724B1] to-[#E056B7] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <Card className="glass-card bg-black/20 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 border-t border-white/10 bg-black/20 backdrop-blur-sm"
      >
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about coding, algorithms, or debugging..."
              className="glass-input bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-[#3A86FF] pr-12"
              disabled={isTyping}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <span>⌘</span>
                <span>Enter</span>
              </div>
            </div>
          </div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-[#3A86FF] to-[#C724B1] hover:from-[#3A86FF]/80 hover:to-[#C724B1]/80 text-white px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          AI can make mistakes. Always verify important information and test your code.
        </p>
      </motion.div>
    </div>
  );
};

export default Chatbot;