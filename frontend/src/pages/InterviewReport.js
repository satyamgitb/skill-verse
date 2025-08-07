import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { 
  Award,
  TrendingUp,
  MessageSquare,
  Volume2,
  VolumeX,
  Download,
  RotateCcw,
  Star,
  Target,
  Brain,
  Mic,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  RadialBarChart,
  RadialBar
} from 'recharts';

const InterviewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [interviewData, setInterviewData] = useState(null);
  const [results, setResults] = useState([]);
  const [overallScores, setOverallScores] = useState({ fluency: 0, confidence: 0, knowledge: 0 });
  const [isReadingReport, setIsReadingReport] = useState(false);
  const [currentSpeechIndex, setCurrentSpeechIndex] = useState(-1);

  useEffect(() => {
    // Load interview data
    const storedInterview = sessionStorage.getItem('currentInterview');
    const storedResults = sessionStorage.getItem('interviewResults');
    
    if (storedInterview && storedResults) {
      const interview = JSON.parse(storedInterview);
      const interviewResults = JSON.parse(storedResults);
      
      if (interview.id === id) {
        setInterviewData(interview);
        setResults(interviewResults);
        
        // Calculate overall scores
        if (interviewResults.length > 0) {
          const totals = interviewResults.reduce((acc, result) => {
            if (result.analysis && result.analysis.scores) {
              acc.fluency += result.analysis.scores.fluency || 0;
              acc.confidence += result.analysis.scores.confidence || 0;
              acc.knowledge += result.analysis.scores.knowledge || 0;
            }
            return acc;
          }, { fluency: 0, confidence: 0, knowledge: 0 });

          const count = interviewResults.length;
          setOverallScores({
            fluency: Math.round(totals.fluency / count),
            confidence: Math.round(totals.confidence / count),
            knowledge: Math.round(totals.knowledge / count)
          });
        }
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  }, [id, navigate]);

  const getScoreColor = (score) => {
    if (score >= 80) return { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500/30' };
    if (score >= 60) return { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500/30' };
    return { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500/30' };
  };

  const getOverallGrade = () => {
    const average = (overallScores.fluency + overallScores.confidence + overallScores.knowledge) / 3;
    if (average >= 90) return { grade: 'A+', color: 'text-green-400', description: 'Exceptional Performance' };
    if (average >= 80) return { grade: 'A', color: 'text-green-400', description: 'Excellent Performance' };
    if (average >= 70) return { grade: 'B', color: 'text-yellow-400', description: 'Good Performance' };
    if (average >= 60) return { grade: 'C', color: 'text-orange-400', description: 'Average Performance' };
    return { grade: 'D', color: 'text-red-400', description: 'Needs Improvement' };
  };

  const pieChartData = [
    { name: 'Fluency', value: overallScores.fluency, color: '#3A86FF' },
    { name: 'Confidence', value: overallScores.confidence, color: '#C724B1' },
    { name: 'Knowledge', value: overallScores.knowledge, color: '#10B981' }
  ];

  const barChartData = results.map((result, index) => ({
    question: `Q${index + 1}`,
    fluency: result.analysis?.scores?.fluency || 0,
    confidence: result.analysis?.scores?.confidence || 0,
    knowledge: result.analysis?.scores?.knowledge || 0
  }));

  const radialData = [
    { name: 'Fluency', value: overallScores.fluency, fill: '#3A86FF' },
    { name: 'Confidence', value: overallScores.confidence, fill: '#C724B1' },
    { name: 'Knowledge', value: overallScores.knowledge, fill: '#10B981' }
  ];

  const readReportAloud = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }

    if (isReadingReport) {
      window.speechSynthesis.cancel();
      setIsReadingReport(false);
      setCurrentSpeechIndex(-1);
      return;
    }

    const grade = getOverallGrade();
    let reportTexts = [
      `Your interview performance summary: You received an overall grade of ${grade.grade}, indicating ${grade.description.toLowerCase()}.`,
      `Your fluency score is ${overallScores.fluency} out of 100.`,
      `Your confidence score is ${overallScores.confidence} out of 100.`,
      `Your technical knowledge score is ${overallScores.knowledge} out of 100.`
    ];

    // Add detailed feedback for each question
    results.forEach((result, index) => {
      if (result.analysis?.reportText) {
        reportTexts.push(`For question ${index + 1}: ${result.analysis.reportText}`);
      }
    });

    setIsReadingReport(true);
    
    const speakNext = (index) => {
      if (index >= reportTexts.length) {
        setIsReadingReport(false);
        setCurrentSpeechIndex(-1);
        return;
      }

      setCurrentSpeechIndex(index);
      const utterance = new SpeechSynthesisUtterance(reportTexts[index]);
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onend = () => {
        speakNext(index + 1);
      };

      utterance.onerror = () => {
        setIsReadingReport(false);
        setCurrentSpeechIndex(-1);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNext(0);
  };

  const retakeInterview = () => {
    // Clear current results
    sessionStorage.removeItem('interviewResults');
    navigate('/dashboard/start-interview');
  };

  const downloadReport = () => {
    const reportData = {
      interview: interviewData,
      overallScores,
      results,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-report-${id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!interviewData || results.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0920] flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-[#3A86FF] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Interview Data</h2>
          <p className="text-gray-400 mb-6">We couldn't find your interview results.</p>
          <Button onClick={() => navigate('/dashboard')} className="bg-[#3A86FF] hover:bg-[#3A86FF]/80">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const grade = getOverallGrade();
  const averageScore = Math.round((overallScores.fluency + overallScores.confidence + overallScores.knowledge) / 3);

  return (
    <div className="min-h-screen bg-[#0A0920] p-6">
      <div className="max-w-7xl mx-auto">
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
              <Award className="w-8 h-8 text-[#3A86FF]" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Interview Performance Report</h1>
          <p className="text-gray-400 text-lg">
            {interviewData.role} • {interviewData.difficulty} level • {results.length} questions answered
          </p>
        </motion.div>

        {/* Overall Grade */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Card className="glass-card bg-gradient-to-r from-black/30 to-black/20 border-white/10 text-center">
            <CardContent className="p-8">
              <div className="flex items-center justify-center space-x-8">
                <div>
                  <div className={`text-8xl font-bold ${grade.color} mb-2`}>{grade.grade}</div>
                  <p className="text-white text-xl font-semibold">{grade.description}</p>
                  <p className="text-gray-400">Overall Score: {averageScore}/100</p>
                </div>
                <div className="w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            { key: 'fluency', label: 'Speaking Fluency', icon: MessageSquare, description: 'Clarity and flow of speech' },
            { key: 'confidence', label: 'Confidence Level', icon: Target, description: 'Conviction and assurance' },
            { key: 'knowledge', label: 'Technical Knowledge', icon: Brain, description: 'Technical accuracy and depth' }
          ].map((metric, index) => {
            const score = overallScores[metric.key];
            const colors = getScoreColor(score);
            const Icon = metric.icon;

            return (
              <motion.div
                key={metric.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <Card className="glass-card bg-black/20 border-white/10 h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`p-4 rounded-full ${colors.bg}/20 w-fit mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{metric.label}</h3>
                    <div className={`text-4xl font-bold ${colors.text} mb-2`}>{score}</div>
                    <p className="text-gray-400 text-sm mb-4">{metric.description}</p>
                    <Progress value={score} className="h-2" />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Question-by-Question Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-[#3A86FF]" />
                  <span>Performance by Question</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <XAxis dataKey="question" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: 'white'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="fluency" fill="#3A86FF" name="Fluency" />
                    <Bar dataKey="confidence" fill="#C724B1" name="Confidence" />
                    <Bar dataKey="knowledge" fill="#10B981" name="Knowledge" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Radial Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Star className="w-5 h-5 text-[#C724B1]" />
                  <span>Skill Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart innerRadius="10%" outerRadius="80%" data={radialData}>
                    <RadialBar
                      minAngle={15}
                      background
                      clockWise={true}
                      dataKey="value"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: 'white'
                      }} 
                    />
                    <Legend />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="glass-card bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-[#3A86FF]" />
                  <span>Detailed Feedback</span>
                </div>
                <Button
                  onClick={readReportAloud}
                  variant="outline"
                  size="sm"
                  className={`border-white/20 ${isReadingReport ? 'text-red-400' : 'text-white'}`}
                >
                  {isReadingReport ? (
                    <>
                      <VolumeX className="w-4 h-4 mr-2" />
                      Stop Reading
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 mr-2" />
                      Read Report Aloud
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`p-4 rounded-lg border transition-all ${
                    currentSpeechIndex === index + 4 ? 'bg-[#3A86FF]/10 border-[#3A86FF]/30' : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">Question {index + 1}</h4>
                    <div className="flex items-center space-x-2">
                      {result.analysis?.scores && (
                        <>
                          <Badge className="bg-[#3A86FF]/20 text-[#3A86FF] border-[#3A86FF]/30">
                            Fluency: {result.analysis.scores.fluency}
                          </Badge>
                          <Badge className="bg-[#C724B1]/20 text-[#C724B1] border-[#C724B1]/30">
                            Confidence: {result.analysis.scores.confidence}
                          </Badge>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Knowledge: {result.analysis.scores.knowledge}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2 italic">"{result.question}"</p>
                  {result.analysis?.reportText && (
                    <p className="text-gray-300 leading-relaxed">{result.analysis.reportText}</p>
                  )}
                  {result.analysis?.transcript && (
                    <details className="mt-3">
                      <summary className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        View your response transcript
                      </summary>
                      <div className="mt-2 p-3 bg-black/30 rounded border border-white/10">
                        <p className="text-gray-300 text-sm italic">"{result.analysis.transcript}"</p>
                      </div>
                    </details>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center space-x-4"
        >
          <Button
            onClick={retakeInterview}
            className="bg-[#3A86FF] hover:bg-[#3A86FF]/80 text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Interview
          </Button>
          
          <Button
            onClick={downloadReport}
            variant="outline"
            className="border-white/20 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-white/20 text-white"
          >
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default InterviewReport;