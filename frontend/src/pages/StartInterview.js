import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { 
  PlayCircle,
  Clock,
  Camera,
  Mic,
  Brain,
  CheckCircle,
  AlertCircle,
  Users,
  Target,
  Zap
} from "lucide-react";

const StartInterview = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [showProcedure, setShowProcedure] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { value: 'frontend', label: 'Frontend Developer', description: 'React, JavaScript, CSS, HTML' },
    { value: 'backend', label: 'Backend Developer', description: 'Node.js, Python, Databases, APIs' },
    { value: 'fullstack', label: 'Full Stack Developer', description: 'Frontend + Backend expertise' },
    { value: 'devops', label: 'DevOps Engineer', description: 'AWS, Docker, CI/CD, Infrastructure' },
    { value: 'mobile', label: 'Mobile Developer', description: 'React Native, Flutter, iOS, Android' }
  ];

  const difficulties = [
    { 
      value: 'easy', 
      label: 'Junior Level', 
      description: '0-2 years experience',
      color: 'bg-green-500/20 text-green-300 border-green-500/30'
    },
    { 
      value: 'medium', 
      label: 'Mid Level', 
      description: '2-5 years experience',
      color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    },
    { 
      value: 'hard', 
      label: 'Senior Level', 
      description: '5+ years experience',
      color: 'bg-red-500/20 text-red-300 border-red-500/30'
    }
  ];

  const interviewProcedure = [
    {
      step: 1,
      title: "Setup & Permissions",
      description: "We'll ask for camera and microphone access to conduct the interview",
      icon: Camera,
      duration: "1 min"
    },
    {
      step: 2,
      title: "AI Interview Session",
      description: "Answer 4-6 technical questions with our AI interviewer",
      icon: Brain,
      duration: "15-20 min"
    },
    {
      step: 3,
      title: "Attention Monitoring",
      description: "We'll track your engagement and provide focus alerts",
      icon: Target,
      duration: "Throughout"
    },
    {
      step: 4,
      title: "Performance Analysis",
      description: "Get detailed feedback on your responses and delivery",
      icon: Zap,
      duration: "2 min"
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role && selectedDifficulty) {
      setShowProcedure(true);
    }
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    if (selectedRole && difficulty) {
      setShowProcedure(true);
    }
  };

  const startInterview = () => {
    // Generate a unique interview ID
    const interviewId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Store interview settings in sessionStorage
    sessionStorage.setItem('currentInterview', JSON.stringify({
      id: interviewId,
      role: selectedRole,
      difficulty: selectedDifficulty,
      startedAt: new Date().toISOString()
    }));

    // Navigate to interview session
    navigate(`/dashboard/interview/session/${interviewId}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0920] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-4 rounded-2xl bg-gradient-to-br from-[#3A86FF]/20 to-[#C724B1]/20 backdrop-blur-sm border border-white/10"
            >
              <Users className="w-8 h-8 text-[#3A86FF]" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">AI-Powered Mock Interview</h1>
          <p className="text-gray-400 text-lg">Practice with our intelligent interviewer and get instant feedback</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Configuration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Role Selection */}
            <Card className="glass-card bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Target className="w-5 h-5 text-[#3A86FF]" />
                  <span>Select Your Role</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {roles.map((role) => (
                    <motion.div
                      key={role.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => handleRoleSelect(role.value)}
                        className={`w-full p-4 rounded-xl border transition-all text-left ${
                          selectedRole === role.value
                            ? "bg-gradient-to-r from-[#3A86FF]/20 to-[#C724B1]/20 border-[#3A86FF]/30 text-white"
                            : "bg-black/20 border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/5"
                        }`}
                      >
                        <div className="font-semibold">{role.label}</div>
                        <div className="text-sm opacity-70 mt-1">{role.description}</div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Difficulty Selection */}
            <Card className="glass-card bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-[#C724B1]" />
                  <span>Choose Difficulty</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {difficulties.map((difficulty) => (
                    <motion.div
                      key={difficulty.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => handleDifficultySelect(difficulty.value)}
                        className={`w-full p-4 rounded-xl border transition-all text-left ${
                          selectedDifficulty === difficulty.value
                            ? "bg-gradient-to-r from-[#3A86FF]/20 to-[#C724B1]/20 border-[#3A86FF]/30 text-white"
                            : "bg-black/20 border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{difficulty.label}</div>
                            <div className="text-sm opacity-70 mt-1">{difficulty.description}</div>
                          </div>
                          <Badge className={`${difficulty.color} border`}>
                            {difficulty.label.split(' ')[0]}
                          </Badge>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side - Procedure */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {showProcedure ? (
              <>
                {/* Interview Procedure */}
                <Card className="glass-card bg-black/20 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Interview Procedure</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {interviewProcedure.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <motion.div
                          key={step.step}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-4 p-3 rounded-lg bg-white/5"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#3A86FF] to-[#C724B1] flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">{step.step}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Icon className="w-4 h-4 text-[#3A86FF]" />
                              <h4 className="text-white font-semibold">{step.title}</h4>
                              <Badge variant="outline" className="border-white/20 text-gray-400 text-xs">
                                {step.duration}
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm">{step.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Requirements Check */}
                <Card className="glass-card bg-black/20 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      <span>Requirements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Camera className="w-4 h-4 text-[#3A86FF]" />
                        <span className="text-sm">Working webcam for attention tracking</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Mic className="w-4 h-4 text-[#C724B1]" />
                        <span className="text-sm">Microphone for voice responses</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Quiet environment for 15-20 minutes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Start Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-center"
                >
                  <Button
                    onClick={startInterview}
                    disabled={!selectedRole || !selectedDifficulty}
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#3A86FF] to-[#C724B1] hover:from-[#3A86FF]/80 hover:to-[#C724B1]/80 text-white text-lg px-8 py-4 rounded-xl shadow-xl"
                  >
                    <PlayCircle className="w-6 h-6 mr-3" />
                    Start AI Interview
                  </Button>
                </motion.div>
              </>
            ) : (
              <Card className="glass-card bg-black/20 border-white/10">
                <CardContent className="p-8 text-center">
                  <Brain className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    Select Role & Difficulty
                  </h3>
                  <p className="text-gray-500">
                    Choose your target role and difficulty level to see the interview procedure
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StartInterview;