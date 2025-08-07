import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { 
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Square,
  AlertTriangle,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Clock,
  Brain,
  CheckCircle,
  Loader2,
  SkipForward,
  User,
  Zap
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

const InterviewSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Interview state
  const [interviewData, setInterviewData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  
  // Media state
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  
  // Face detection state
  const [faceDetected, setFaceDetected] = useState(true);
  const [attentionWarning, setAttentionWarning] = useState(false);
  const [cv, setCv] = useState(null);
  const [classifier, setClassifier] = useState(null);
  
  // Interview flow state
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [sessionStartTime] = useState(new Date());
  
  // Speech synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  
  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const attentionTimeoutRef = useRef(null);
  const speechSynthRef = useRef(null);

  // Load interview data from sessionStorage
  useEffect(() => {
    const storedData = sessionStorage.getItem('currentInterview');
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data.id === id) {
        setInterviewData(data);
      } else {
        navigate('/dashboard/start-interview');
      }
    } else {
      navigate('/dashboard/start-interview');
    }
  }, [id, navigate]);

  // Load OpenCV and face detection
  useEffect(() => {
    const loadOpenCV = async () => {
      try {
        if (window.cv) {
          setCv(window.cv);
          loadHaarCascade();
        } else {
          // OpenCV will be loaded via script tag
          window.onOpenCvReady = () => {
            setCv(window.cv);
            loadHaarCascade();
          };
        }
      } catch (error) {
        console.error('Failed to load OpenCV:', error);
      }
    };

    const loadHaarCascade = async () => {
      try {
        const response = await fetch('/haarcascade_frontalface_default.xml');
        const xmlText = await response.text();
        
        if (window.cv) {
          const classifier = new window.cv.CascadeClassifier();
          const success = classifier.load('/haarcascade_frontalface_default.xml');
          if (success) {
            setClassifier(classifier);
          }
        }
      } catch (error) {
        console.error('Failed to load face detection model:', error);
      }
    };

    loadOpenCV();
  }, []);

  // Initialize media devices
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        setStream(mediaStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        // Initialize MediaRecorder
        const recorder = new MediaRecorder(mediaStream, {
          mimeType: 'audio/webm;codecs=opus'
        });

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setAudioChunks(prev => [...prev, event.data]);
          }
        };

        recorder.onstop = () => {
          // Audio chunks will be processed in handleStopRecording
        };

        setMediaRecorder(recorder);

      } catch (error) {
        console.error('Failed to initialize media:', error);
      }
    };

    initializeMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Face detection loop
  useEffect(() => {
    let animationFrame;

    const detectFaces = () => {
      if (videoRef.current && canvasRef.current && cv && classifier && cameraEnabled) {
        try {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0);

          const src = cv.imread(canvas);
          const gray = new cv.Mat();
          const faces = new cv.RectVector();

          cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
          classifier.detectMultiScale(gray, faces, 1.1, 3, 0);

          const faceCount = faces.size();
          const detected = faceCount > 0;

          setFaceDetected(detected);

          if (!detected) {
            if (attentionTimeoutRef.current) {
              clearTimeout(attentionTimeoutRef.current);
            }
            attentionTimeoutRef.current = setTimeout(() => {
              setAttentionWarning(true);
            }, 3000);
          } else {
            if (attentionTimeoutRef.current) {
              clearTimeout(attentionTimeoutRef.current);
            }
            setAttentionWarning(false);
          }

          // Clean up
          src.delete();
          gray.delete();
          faces.delete();
        } catch (error) {
          console.error('Face detection error:', error);
        }
      }

      animationFrame = requestAnimationFrame(detectFaces);
    };

    if (cv && classifier) {
      detectFaces();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (attentionTimeoutRef.current) {
        clearTimeout(attentionTimeoutRef.current);
      }
    };
  }, [cv, classifier, cameraEnabled]);

  // Generate first question when interview data is loaded
  useEffect(() => {
    if (interviewData && questions.length === 0) {
      generateQuestion();
    }
  }, [interviewData]);

  const generateQuestion = async () => {
    if (!interviewData) return;

    setIsLoadingQuestion(true);
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/interview/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: interviewData.role,
          difficulty: interviewData.difficulty,
          round: currentQuestionIndex + 1,
          previousQuestions: questions
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentQuestion(data.question);
        setQuestions(prev => [...prev, data.question]);
        
        // Speak the question
        if (speechEnabled) {
          speakQuestion(data.question);
        }
      } else {
        // Fallback question
        const fallbackQuestions = [
          "Tell me about your experience with modern web development.",
          "How do you approach solving complex technical problems?",
          "Describe a challenging project you've worked on recently.",
          "What are your thoughts on code quality and best practices?"
        ];
        const fallback = fallbackQuestions[currentQuestionIndex % fallbackQuestions.length];
        setCurrentQuestion(fallback);
        setQuestions(prev => [...prev, fallback]);
        
        if (speechEnabled) {
          speakQuestion(fallback);
        }
      }
    } catch (error) {
      console.error('Failed to generate question:', error);
      // Use fallback
      const fallback = "Tell me about your technical background and experience.";
      setCurrentQuestion(fallback);
      setQuestions(prev => [...prev, fallback]);
      
      if (speechEnabled) {
        speakQuestion(fallback);
      }
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  const speakQuestion = (question) => {
    if ('speechSynthesis' in window && speechEnabled) {
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        startListening();
      };

      speechSynthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
      setIsListening(true);
      setIsRecording(true);
      setQuestionStartTime(new Date());
      setAudioChunks([]);
      mediaRecorder.start();
    }
  };

  const handleStopRecording = useCallback(async () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      setIsRecording(false);
      setIsListening(false);
      mediaRecorder.stop();

      // Process the recorded audio
      setTimeout(async () => {
        if (audioChunks.length > 0) {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });
          await analyzeResponse(audioBlob);
        }
      }, 500);
    }
  }, [mediaRecorder, audioChunks]);

  const analyzeResponse = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'response.webm');
      formData.append('question', currentQuestion);
      formData.append('questionIndex', currentQuestionIndex);

      const response = await fetch(`${BACKEND_URL}/api/interview/analyze`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const analysis = await response.json();
        
        // Store analysis result
        const currentResults = JSON.parse(sessionStorage.getItem('interviewResults') || '[]');
        currentResults.push({
          questionIndex: currentQuestionIndex,
          question: currentQuestion,
          analysis,
          timestamp: new Date().toISOString()
        });
        sessionStorage.setItem('interviewResults', JSON.stringify(currentResults));
        
        // Move to next question or finish interview
        if (currentQuestionIndex < 4) { // 5 questions total
          setCurrentQuestionIndex(prev => prev + 1);
          setTimeout(() => {
            generateQuestion();
          }, 2000);
        } else {
          finishInterview();
        }
      }
    } catch (error) {
      console.error('Failed to analyze response:', error);
      // Continue anyway
      if (currentQuestionIndex < 4) {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeout(() => {
          generateQuestion();
        }, 2000);
      } else {
        finishInterview();
      }
    }
  };

  const finishInterview = () => {
    // Stop all media
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    
    // Navigate to report
    navigate(`/dashboard/report/${id}`);
  };

  const toggleCamera = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !cameraEnabled;
        setCameraEnabled(!cameraEnabled);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioEnabled;
        setAudioEnabled(!audioEnabled);
      }
    }
  };

  const skipQuestion = () => {
    if (isSpeaking && speechSynthRef.current) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    
    if (isRecording) {
      handleStopRecording();
    } else {
      if (currentQuestionIndex < 4) {
        setCurrentQuestionIndex(prev => prev + 1);
        generateQuestion();
      } else {
        finishInterview();
      }
    }
  };

  if (!interviewData) {
    return (
      <div className="min-h-screen bg-[#0A0920] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#3A86FF] animate-spin mx-auto mb-4" />
          <p className="text-white">Loading interview session...</p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / 5) * 100;
  const elapsedTime = Math.floor((new Date() - sessionStartTime) / 1000 / 60);

  return (
    <div className="min-h-screen bg-[#0A0920] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Brain className="w-6 h-6 text-[#3A86FF]" />
            <div>
              <h1 className="text-xl font-bold text-white">AI Interview Session</h1>
              <p className="text-gray-400 text-sm">
                {interviewData.role} • {interviewData.difficulty} level
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{elapsedTime}m elapsed</span>
            </div>
            
            <Badge className="bg-[#3A86FF]/20 text-[#3A86FF] border-[#3A86FF]/30">
              Question {currentQuestionIndex + 1}/5
            </Badge>
            
            <Button
              onClick={finishInterview}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <Square className="w-4 h-4 mr-2" />
              End Interview
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4 bg-black/10">
        <div className="max-w-7xl mx-auto">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-gray-400 text-sm mt-2">
            Interview Progress: {Math.round(progress)}%
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Panel */}
        <div className="w-80 border-r border-white/10 bg-black/10 p-4 flex flex-col">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Camera className="w-5 h-5 text-[#3A86FF] mr-2" />
            Your Video
          </h3>
          
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-4">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 opacity-0 pointer-events-none"
            />
            
            {/* Face Detection Indicator */}
            <div className="absolute top-3 right-3">
              {faceDetected ? (
                <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                  <Eye className="w-3 h-3" />
                  <span>Focused</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
                  <EyeOff className="w-3 h-3" />
                  <span>Not Detected</span>
                </div>
              )}
            </div>

            {!cameraEnabled && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <CameraOff className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>

          {/* Media Controls */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={toggleCamera}
                variant="outline"
                size="sm"
                className={`border-white/20 ${cameraEnabled ? 'text-white' : 'text-red-400'}`}
              >
                {cameraEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
              </Button>
              <Button
                onClick={toggleAudio}
                variant="outline"
                size="sm"
                className={`border-white/20 ${audioEnabled ? 'text-white' : 'text-red-400'}`}
              >
                {audioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </Button>
            </div>

            <Button
              onClick={() => setSpeechEnabled(!speechEnabled)}
              variant="outline"
              size="sm"
              className={`w-full border-white/20 ${speechEnabled ? 'text-white' : 'text-gray-400'}`}
            >
              {speechEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
              Voice Questions
            </Button>
          </div>

          {/* Attention Warning */}
          <AnimatePresence>
            {attentionWarning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg"
              >
                <div className="flex items-center space-x-2 text-yellow-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">Please look at the camera</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Question Panel */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-4xl w-full">
            <AnimatePresence mode="wait">
              {isLoadingQuestion ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <Loader2 className="w-12 h-12 text-[#3A86FF] animate-spin mx-auto mb-4" />
                  <p className="text-white text-lg">Generating your next question...</p>
                </motion.div>
              ) : (
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <Card className="glass-card bg-black/20 border-white/10 mb-8">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-white mb-6 leading-relaxed">
                        {currentQuestion}
                      </h2>
                      
                      <div className="flex items-center justify-center space-x-4 mb-6">
                        {isSpeaking && (
                          <div className="flex items-center space-x-2 text-[#3A86FF]">
                            <Volume2 className="w-5 h-5" />
                            <span>AI is speaking...</span>
                          </div>
                        )}
                        
                        {isListening && (
                          <div className="flex items-center space-x-2 text-red-400">
                            <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
                            <span>Recording your response...</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-center space-x-4">
                        {!isListening && !isSpeaking ? (
                          <Button
                            onClick={() => speakQuestion(currentQuestion)}
                            className="bg-[#3A86FF] hover:bg-[#3A86FF]/80"
                          >
                            <Volume2 className="w-4 h-4 mr-2" />
                            Repeat Question
                          </Button>
                        ) : isListening ? (
                          <Button
                            onClick={handleStopRecording}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            <Square className="w-4 h-4 mr-2" />
                            Stop Recording
                          </Button>
                        ) : null}
                        
                        <Button
                          onClick={skipQuestion}
                          variant="outline"
                          className="border-white/20 text-white"
                        >
                          <SkipForward className="w-4 h-4 mr-2" />
                          Skip Question
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <p className="text-gray-400">
                    {isListening 
                      ? "Speak your answer clearly. Click 'Stop Recording' when finished."
                      : isSpeaking 
                      ? "Listen to the question. Recording will start automatically."
                      : "Click 'Repeat Question' to hear it again, or answer when ready."
                    }
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSession;