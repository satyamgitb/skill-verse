import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { 
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Square,
  RotateCcw,
  Settings,
  Headphones,
  Radio,
  Timer,
  Trophy,
  Target,
  Zap
} from "lucide-react";

const VoiceBot = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [audioLevels, setAudioLevels] = useState([]);
  const [sessionTime, setSessionTime] = useState(0);

  const interviewQuestions = [
    {
      id: 1,
      question: "Tell me about yourself and your experience with Java programming.",
      category: "Introduction",
      difficulty: "Easy",
      timeLimit: 120
    },
    {
      id: 2,
      question: "Explain the difference between ArrayList and LinkedList. When would you use each?",
      category: "Data Structures",
      difficulty: "Medium",
      timeLimit: 180
    },
    {
      id: 3,
      question: "Walk me through how you would design a cache system with expiration.",
      category: "System Design",
      difficulty: "Hard",
      timeLimit: 300
    },
    {
      id: 4,
      question: "How do you handle exceptions in Java? Give me an example of best practices.",
      category: "Best Practices",
      difficulty: "Medium",
      timeLimit: 180
    }
  ];

  const sessionStats = {
    questionsAnswered: 0,
    averageResponseTime: 0,
    confidence: 85,
    clarity: 92
  };

  // Generate random audio levels for visualization
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        const newLevels = Array.from({ length: 20 }, () => Math.random() * 100);
        setAudioLevels(newLevels);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioLevels([]);
    }
  }, [isRecording]);

  // Session timer
  useEffect(() => {
    let interval;
    if (sessionActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive]);

  const startSession = () => {
    setSessionActive(true);
    setCurrentQuestion(0);
    setSessionTime(0);
  };

  const endSession = () => {
    setSessionActive(false);
    setIsRecording(false);
    setIsPlaying(false);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const nextQuestion = () => {
    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setIsRecording(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const AudioVisualizer = () => (
    <div className="flex items-center justify-center space-x-2 h-32">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-3 bg-gradient-to-t from-[#3A86FF] to-[#C724B1] rounded-full"
          animate={{
            height: isRecording 
              ? [20, audioLevels[i] || 20, 20]
              : [20, 20, 20]
          }}
          transition={{
            duration: 0.5,
            repeat: isRecording ? Infinity : 0,
            ease: "easeInOut"
          }}
          style={{
            height: 20,
            opacity: isRecording ? 1 : 0.3
          }}
        />
      ))}
    </div>
  );

  if (!sessionActive) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0A0920] p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-[#3A86FF] to-[#C724B1] flex items-center justify-center"
          >
            <Headphones className="w-16 h-16 text-white" />
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-4">Voice Interview Practice</h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Practice your interview skills with AI-powered voice conversations. 
            Get real-time feedback on your responses, speaking pace, and confidence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-card bg-black/20 border-white/10 text-center">
              <CardContent className="p-6">
                <Radio className="w-10 h-10 text-[#3A86FF] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">AI Interviewer</h3>
                <p className="text-gray-400 text-sm">Realistic interview simulation with intelligent follow-up questions</p>
              </CardContent>
            </Card>

            <Card className="glass-card bg-black/20 border-white/10 text-center">
              <CardContent className="p-6">
                <Target className="w-10 h-10 text-[#C724B1] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Real-time Analysis</h3>
                <p className="text-gray-400 text-sm">Get instant feedback on speech clarity, pace, and confidence</p>
              </CardContent>
            </Card>

            <Card className="glass-card bg-black/20 border-white/10 text-center">
              <CardContent className="p-6">
                <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Skill Improvement</h3>
                <p className="text-gray-400 text-sm">Track progress and identify areas for improvement</p>
              </CardContent>
            </Card>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={startSession}
              size="lg"
              className="bg-gradient-to-r from-[#3A86FF] to-[#C724B1] hover:from-[#3A86FF]/80 hover:to-[#C724B1]/80 text-white text-lg px-12 py-4 rounded-2xl shadow-2xl"
            >
              <Play className="w-6 h-6 mr-3" />
              Start Voice Practice
            </Button>
          </motion.div>

          <p className="text-gray-500 text-sm mt-6">
            Make sure your microphone is connected and working properly
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0A0920]">
      {/* Session Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 border-b border-white/10 bg-black/20 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Headphones className="w-6 h-6 text-[#C724B1]" />
              <h1 className="text-2xl font-bold text-white">Voice Interview</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Timer className="w-4 h-4" />
                <span>{formatTime(sessionTime)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>Question {currentQuestion + 1} of {interviewQuestions.length}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              onClick={endSession}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <Square className="w-4 h-4 mr-2" />
              End Session
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 flex">
        {/* Main Interview Area */}
        <div className="flex-1 flex flex-col">
          {/* Progress Bar */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Session Progress</span>
              <span className="text-sm text-white">{Math.round((currentQuestion / interviewQuestions.length) * 100)}%</span>
            </div>
            <Progress 
              value={(currentQuestion / interviewQuestions.length) * 100} 
              className="h-2"
            />
          </div>

          {/* Current Question */}
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl"
            >
              <div className="mb-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    interviewQuestions[currentQuestion].difficulty === 'Hard' ? 'bg-red-500/20 text-red-300' :
                    interviewQuestions[currentQuestion].difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {interviewQuestions[currentQuestion].difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#3A86FF]/20 text-[#3A86FF]">
                    {interviewQuestions[currentQuestion].category}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 leading-relaxed">
                  {interviewQuestions[currentQuestion].question}
                </h2>
                
                <p className="text-gray-400">
                  Time limit: {Math.floor(interviewQuestions[currentQuestion].timeLimit / 60)} minutes
                </p>
              </div>

              {/* Audio Visualizer */}
              <Card className="glass-card bg-black/20 border-white/10 mb-8">
                <CardContent className="p-8">
                  <AudioVisualizer />
                  
                  <div className="flex items-center justify-center space-x-6 mt-8">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        onClick={toggleRecording}
                        size="lg"
                        className={`w-20 h-20 rounded-full ${
                          isRecording 
                            ? 'bg-red-500 hover:bg-red-600 pulse-glow' 
                            : 'bg-gradient-to-r from-[#3A86FF] to-[#C724B1] hover:from-[#3A86FF]/80 hover:to-[#C724B1]/80'
                        } text-white shadow-xl`}
                      >
                        {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                      </Button>
                    </motion.div>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/20 text-white"
                      disabled={!isRecording}
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Restart Answer
                    </Button>
                    
                    <Button
                      onClick={nextQuestion}
                      size="lg"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      disabled={currentQuestion >= interviewQuestions.length - 1}
                    >
                      Next Question
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <p className="text-gray-500 text-sm">
                {isRecording ? "🔴 Recording your response..." : "Click the microphone to start recording your answer"}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats Panel */}
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 border-l border-white/10 bg-black/10 backdrop-blur-sm"
        >
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white">Session Analytics</h3>
            
            {/* Real-time Stats */}
            <div className="space-y-4">
              <Card className="glass-card bg-black/20 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Confidence</span>
                    <span className="text-lg font-bold text-[#3A86FF]">{sessionStats.confidence}%</span>
                  </div>
                  <Progress value={sessionStats.confidence} className="h-2" />
                </CardContent>
              </Card>

              <Card className="glass-card bg-black/20 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Speech Clarity</span>
                    <span className="text-lg font-bold text-[#C724B1]">{sessionStats.clarity}%</span>
                  </div>
                  <Progress value={sessionStats.clarity} className="h-2" />
                </CardContent>
              </Card>

              <Card className="glass-card bg-black/20 border-white/10">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                      <span className="text-sm text-gray-400">Avg Response Time</span>
                    </div>
                    <span className="text-2xl font-bold text-yellow-400">2m 15s</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Question History */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Questions</h4>
              <div className="space-y-2">
                {interviewQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className={`p-3 rounded-lg border transition-all ${
                      index === currentQuestion
                        ? 'bg-[#3A86FF]/10 border-[#3A86FF]/30'
                        : index < currentQuestion
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-black/20 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">Q{index + 1}</span>
                      {index < currentQuestion && (
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                      {index === currentQuestion && (
                        <div className="w-2 h-2 bg-[#3A86FF] rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate">{question.category}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Controls */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm font-semibold text-white mb-3">Audio Settings</h4>
              <div className="flex items-center justify-between">
                <Button size="sm" variant="outline" className="border-white/20 text-white">
                  <Volume2 className="w-4 h-4" />
                </Button>
                <div className="flex-1 mx-3">
                  <Progress value={75} className="h-2" />
                </div>
                <span className="text-xs text-gray-400">75%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoiceBot;