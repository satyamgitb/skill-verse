import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import CodingInterview from "./pages/CodingInterview";
import Chatbot from "./pages/Chatbot";
import VoiceBot from "./pages/VoiceBot";
import Settings from "./pages/Settings";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App min-h-screen bg-[#0A0920] text-white font-inter">
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <LoginPage onLogin={() => setIsAuthenticated(true)} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                <DashboardLayout /> : 
                <Navigate to="/" replace />
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="interview/:id" element={<CodingInterview />} />
              <Route path="practice/chatbot" element={<Chatbot />} />
              <Route path="practice/voice-bot" element={<VoiceBot />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;