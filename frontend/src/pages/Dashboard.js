import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { 
  Calendar,
  Clock,
  Trophy,
  TrendingUp,
  Code2,
  Target,
  Zap,
  Star,
  PlayCircle,
  BookOpen,
  Users,
  Award
} from "lucide-react";

const Dashboard = () => {
  const upcomingInterviews = [
    {
      id: 1,
      company: "TechCorp",
      position: "Senior Frontend Developer",
      date: "2025-01-15",
      time: "14:00",
      type: "Technical",
      difficulty: "Hard"
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      date: "2025-01-18",
      time: "10:30",
      type: "System Design",
      difficulty: "Medium"
    },
    {
      id: 3,
      company: "MegaTech",
      position: "Backend Developer",
      date: "2025-01-22",
      time: "16:00",
      type: "Coding",
      difficulty: "Hard"
    }
  ];

  const stats = [
    { 
      title: "Problems Solved", 
      value: "247", 
      change: "+12 this week",
      icon: Code2,
      color: "from-[#3A86FF] to-[#5DADE2]"
    },
    { 
      title: "Current Streak", 
      value: "15 days", 
      change: "Personal best!",
      icon: Zap,
      color: "from-[#C724B1] to-[#E056B7]"
    },
    { 
      title: "Success Rate", 
      value: "85%", 
      change: "+5% this month",
      icon: Target,
      color: "from-[#28A745] to-[#20C997]"
    },
    { 
      title: "Skill Level", 
      value: "Level 12", 
      change: "1,247 XP",
      icon: Trophy,
      color: "from-[#FFC107] to-[#FFD93D]"
    }
  ];

  const recentActivity = [
    { type: "solved", title: "Two Sum Problem", time: "2 hours ago", difficulty: "Easy" },
    { type: "interview", title: "Mock Interview Completed", time: "1 day ago", difficulty: "Medium" },
    { type: "achievement", title: "Earned 'Algorithm Master' Badge", time: "2 days ago", difficulty: "Hard" },
    { type: "study", title: "Completed Dynamic Programming Course", time: "3 days ago", difficulty: "Medium" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Alex! 👋</h1>
          <p className="text-gray-400">Ready to level up your coding skills today?</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm text-gray-400">Today's Goal</div>
            <div className="text-lg font-semibold text-[#3A86FF]">3/5 Problems</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#3A86FF] to-[#C724B1] flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass-card bg-black/20 border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-20`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400 font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-green-400">{stat.change}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Interviews */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2"
        >
          <Card className="glass-card bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Calendar className="w-5 h-5 text-[#3A86FF]" />
                <span>Upcoming Interviews</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingInterviews.map((interview, index) => (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-white">{interview.company}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          interview.difficulty === 'Hard' ? 'bg-red-500/20 text-red-300' :
                          interview.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {interview.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-1">{interview.position}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{interview.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{interview.time}</span>
                        </span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-[#3A86FF] hover:bg-[#3A86FF]/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <PlayCircle className="w-4 h-4 mr-1" />
                      Prepare
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="glass-card bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <BookOpen className="w-5 h-5 text-[#C724B1]" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'solved' ? 'bg-green-400' :
                    activity.type === 'interview' ? 'bg-blue-400' :
                    activity.type === 'achievement' ? 'bg-yellow-400' :
                    'bg-purple-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activity.difficulty === 'Hard' ? 'bg-red-500/20 text-red-300' :
                    activity.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {activity.difficulty}
                  </span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="glass-card bg-gradient-to-br from-[#3A86FF]/10 to-[#3A86FF]/5 border-[#3A86FF]/20 hover:border-[#3A86FF]/40 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <Code2 className="w-12 h-12 text-[#3A86FF] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">Start Coding</h3>
              <p className="text-gray-400 text-sm mb-4">Practice with curated problems</p>
              <Button className="w-full bg-[#3A86FF] hover:bg-[#3A86FF]/80">
                Begin Session
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass-card bg-gradient-to-br from-[#C724B1]/10 to-[#C724B1]/5 border-[#C724B1]/20 hover:border-[#C724B1]/40 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-[#C724B1] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">Mock Interview</h3>
              <p className="text-gray-400 text-sm mb-4">AI-powered interview practice</p>
              <Button className="w-full bg-[#C724B1] hover:bg-[#C724B1]/80">
                Start Interview
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass-card bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 hover:border-green-500/40 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">View Progress</h3>
              <p className="text-gray-400 text-sm mb-4">Track your learning journey</p>
              <Button className="w-full bg-green-500 hover:bg-green-500/80">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;