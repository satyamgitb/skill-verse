import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { 
  Home, 
  Code2, 
  MessageSquare, 
  Mic, 
  Settings, 
  Menu, 
  X,
  LogOut,
  User,
  Trophy,
  Target
} from "lucide-react";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { 
      icon: Home, 
      label: "Dashboard", 
      path: "/dashboard",
      description: "Overview & Progress"
    },
    { 
      icon: Code2, 
      label: "AI Interview", 
      path: "/dashboard/start-interview",
      description: "AI-Powered Practice"
    },
    { 
      icon: MessageSquare, 
      label: "Code Helper", 
      path: "/dashboard/practice/chatbot",
      description: "AI Assistant"
    },
    { 
      icon: Mic, 
      label: "Voice Practice", 
      path: "/dashboard/practice/voice-bot",
      description: "Mock Interviews"
    },
    { 
      icon: Settings, 
      label: "Settings", 
      path: "/dashboard/settings",
      description: "Preferences"
    }
  ];

  const isActivePath = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-[#0A0920] text-white overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarCollapsed ? 80 : 280
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col"
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center space-x-3"
                >
                  <div className="p-2 rounded-xl bg-gradient-to-br from-[#3A86FF] to-[#C724B1]">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-[#3A86FF] to-[#C724B1] bg-clip-text text-transparent">
                      SkillVerse
                    </h2>
                    <p className="text-xs text-gray-400">Pro Developer</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 text-left group ${
                    isActive
                      ? "bg-gradient-to-r from-[#3A86FF]/20 to-[#C724B1]/20 border border-[#3A86FF]/30 shadow-lg shadow-[#3A86FF]/10"
                      : "hover:bg-white/5 hover:border-white/10 border border-transparent"
                  }`}
                >
                  <Icon 
                    className={`w-5 h-5 transition-colors ${
                      isActive ? "text-[#3A86FF]" : "text-gray-400 group-hover:text-white"
                    }`} 
                  />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex-1"
                      >
                        <div className={`font-medium ${isActive ? "text-white" : "text-gray-300"}`}>
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {item.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-2 h-2 bg-gradient-to-r from-[#3A86FF] to-[#C724B1] rounded-full"
                    />
                  )}
                </button>
              </motion.div>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-white/10">
          <div className={`flex items-center space-x-3 p-3 rounded-xl bg-white/5 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#3A86FF] to-[#C724B1] flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex-1"
                >
                  <div className="text-sm font-medium text-white">Alex Thompson</div>
                  <div className="text-xs text-gray-400">Level 12 Developer</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 flex items-center justify-between text-xs text-gray-400"
            >
              <div className="flex items-center space-x-1">
                <Trophy className="w-3 h-3" />
                <span>1,247 XP</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-3 h-3" />
                <span>85% Goal</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 overflow-auto"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;