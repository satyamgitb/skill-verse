import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Eye, EyeOff, Code2, Sparkles } from "lucide-react";

const LoginPage = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - just call onLogin after a brief delay
    setTimeout(() => {
      onLogin();
    }, 500);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Aurora Background */}
      <div className="absolute inset-0">
        <div className="aurora-bg">
          <div className="aurora-layer aurora-layer-1"></div>
          <div className="aurora-layer aurora-layer-2"></div>
          <div className="aurora-layer aurora-layer-3"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#3A86FF] rounded-full opacity-30"
            animate={{
              y: [-20, -100],
              x: [0, Math.random() * 50 - 25],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-3 rounded-2xl bg-gradient-to-br from-[#3A86FF]/20 to-[#C724B1]/20 backdrop-blur-sm border border-white/10"
            >
              <Code2 className="w-8 h-8 text-[#3A86FF]" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#3A86FF] to-[#C724B1] bg-clip-text text-transparent mb-2">
            SkillVerse
          </h1>
          <p className="text-gray-400 text-lg">Master Your Coding Journey</p>
        </motion.div>

        <Card className="glass-card border-white/10 backdrop-blur-xl bg-black/20">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C724B1]" />
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="developer@skillverse.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="glass-input bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-[#3A86FF] transition-all duration-300"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="glass-input bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-[#3A86FF] transition-all duration-300 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#3A86FF] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#3A86FF] to-[#C724B1] hover:from-[#3A86FF]/80 hover:to-[#C724B1]/80 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Enter SkillVerse
                </Button>
              </motion.div>

              <div className="text-center">
                <a href="#" className="text-[#3A86FF] hover:text-[#C724B1] transition-colors text-sm">
                  Forgot your password?
                </a>
              </div>
            </form>
          </CardContent>
        </Card>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          New to SkillVerse?{" "}
          <a href="#" className="text-[#3A86FF] hover:text-[#C724B1] transition-colors">
            Create your account
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;