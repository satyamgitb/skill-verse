import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { 
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clock,
  Code2,
  Video,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Settings,
  Maximize,
  MessageSquare
} from "lucide-react";

const CodingInterview = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      examples: [
        { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
        { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
      ],
      timeLimit: 15,
      solved: true
    },
    {
      id: 2,
      title: "Valid Parentheses",
      difficulty: "Easy",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      examples: [
        { input: "s = \"()\"", output: "true" },
        { input: "s = \"([)]\"", output: "false" }
      ],
      timeLimit: 20,
      solved: false
    },
    {
      id: 3,
      title: "Merge Intervals",
      difficulty: "Medium",
      description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
      examples: [
        { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }
      ],
      timeLimit: 30,
      solved: false
    }
  ];

  const mockJavaCode = `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Hash map to store number and its index
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            
            map.put(nums[i], i);
        }
        
        // Return empty array if no solution found
        return new int[] {};
    }
}`;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="h-full flex flex-col bg-[#0A0920]">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Code2 className="w-6 h-6 text-[#3A86FF]" />
              <h1 className="text-2xl font-bold text-white">Coding Interview</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>45:30 remaining</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVideoEnabled(!videoEnabled)}
              className={`border-white/20 ${videoEnabled ? 'text-white' : 'text-red-400'}`}
            >
              {videoEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`border-white/20 ${audioEnabled ? 'text-white' : 'text-red-400'}`}
            >
              {audioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>
            <Button
              onClick={toggleTimer}
              className={`${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-[#3A86FF] hover:bg-[#3A86FF]/80'}`}
            >
              {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isRunning ? 'Pause' : 'Start'} Session
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Problems Panel */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 border-r border-white/10 bg-black/10 backdrop-blur-sm overflow-y-auto"
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 text-[#C724B1] mr-2" />
              Problems ({problems.length})
            </h2>
            
            <div className="space-y-3">
              {problems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 ${
                      currentProblem === index 
                        ? 'glass-card bg-[#3A86FF]/10 border-[#3A86FF]/30' 
                        : 'bg-black/20 border-white/10 hover:border-white/20'
                    }`}
                    onClick={() => setCurrentProblem(index)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-white text-sm">{problem.title}</h3>
                        {problem.solved && <CheckCircle className="w-4 h-4 text-green-400" />}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          problem.difficulty === 'Hard' ? 'bg-red-500/20 text-red-300' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {problem.difficulty}
                        </span>
                        <span className="text-xs text-gray-400">{problem.timeLimit}min</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-black/30 border border-white/10">
              <h3 className="text-sm font-medium text-white mb-2">Session Progress</h3>
              <Progress value={33} className="mb-2" />
              <p className="text-xs text-gray-400">1 of 3 problems solved</p>
            </div>
          </div>
        </motion.div>

        {/* Code Editor Panel */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex-1 flex flex-col"
        >
          {/* Problem Description */}
          <div className="p-6 border-b border-white/10 bg-black/5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                {problems[currentProblem].title}
              </h2>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  problems[currentProblem].difficulty === 'Hard' ? 'bg-red-500/20 text-red-300' :
                  problems[currentProblem].difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {problems[currentProblem].difficulty}
                </span>
                <Button size="sm" variant="outline" className="border-white/20 text-white">
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4 leading-relaxed">
              {problems[currentProblem].description}
            </p>
            
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">Examples:</h3>
              {problems[currentProblem].examples.map((example, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-black/30 border border-white/10">
                  <div className="text-sm">
                    <span className="text-gray-400">Input: </span>
                    <span className="text-[#3A86FF] font-mono">{example.input}</span>
                  </div>
                  <div className="text-sm mt-1">
                    <span className="text-gray-400">Output: </span>
                    <span className="text-[#C724B1] font-mono">{example.output}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monaco Editor Placeholder */}
          <div className="flex-1 p-6">
            <div className="h-full rounded-xl bg-[#1e1e2e] border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between p-3 bg-[#2a2a3e] border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>Solution.java</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="border-white/20 text-white">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button size="sm" className="bg-[#3A86FF] hover:bg-[#3A86FF]/80">
                    <Play className="w-4 h-4 mr-2" />
                    Run
                  </Button>
                </div>
              </div>
              
              <div className="p-4 h-full overflow-auto">
                <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
                  {mockJavaCode}
                </pre>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Chat Panel */}
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 border-l border-white/10 bg-black/10 backdrop-blur-sm flex flex-col"
        >
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <Video className="w-5 h-5 text-[#C724B1] mr-2" />
              Interview Session
            </h2>
          </div>

          {/* Interviewer Video */}
          <div className="p-4">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center mb-4 overflow-hidden">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#3A86FF] to-[#C724B1] flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">AI</span>
                </div>
                <p className="text-white font-medium">Sarah Chen</p>
                <p className="text-gray-400 text-sm">Senior Engineering Manager</p>
              </div>
            </div>

            {/* Your Video */}
            <div className="aspect-video rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center relative">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">You</span>
                </div>
                <p className="text-white text-sm">Your Camera</p>
              </div>
              {!videoEnabled && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                  <CameraOff className="w-8 h-8 text-red-400" />
                </div>
              )}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[#3A86FF]/10 border border-[#3A86FF]/20">
                <p className="text-xs text-gray-400 mb-1">Sarah Chen</p>
                <p className="text-white text-sm">Great! Let's start with the Two Sum problem. Can you walk me through your approach?</p>
              </div>
              
              <div className="p-3 rounded-lg bg-black/30 border border-white/10 ml-6">
                <p className="text-xs text-gray-400 mb-1">You</p>
                <p className="text-white text-sm">I'll use a hash map to store the numbers and their indices as I iterate through the array.</p>
              </div>
              
              <div className="p-3 rounded-lg bg-[#3A86FF]/10 border border-[#3A86FF]/20">
                <p className="text-xs text-gray-400 mb-1">Sarah Chen</p>
                <p className="text-white text-sm">Excellent! That's an efficient O(n) solution. Can you implement it?</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 border-t border-white/10">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="border-white/20 text-white"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-white/20 text-white"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodingInterview;