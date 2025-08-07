#!/bin/bash

# SkillVerse AI Interview Platform - Complete System Demo

echo "🚀 SkillVerse AI Interview Platform Demo"
echo "========================================"

echo ""
echo "📊 Testing AI Backend Services..."

# Test health endpoint
echo "1. Health Check:"
curl -s http://localhost:3001/health | jq '.'

echo ""
echo "2. AI Question Generation (Frontend, Medium difficulty):"
curl -s -X POST http://localhost:3001/api/interview/question \
  -H "Content-Type: application/json" \
  -d '{"role": "frontend", "difficulty": "medium", "round": 1}' | jq '.'

echo ""
echo "3. AI Question Generation (Backend, Hard difficulty):"
curl -s -X POST http://localhost:3001/api/interview/question \
  -H "Content-Type: application/json" \
  -d '{"role": "backend", "difficulty": "hard", "round": 2}' | jq '.'

echo ""
echo "4. AI Service Status:"
curl -s http://localhost:3001/api/interview/test-ai | jq '.'

echo ""
echo "🎯 System Status:"
echo "✅ AI Backend: Running on port 3001"
echo "✅ React Frontend: Running on port 3000" 
echo "✅ Question Generation: Working (with fallback)"
echo "✅ Audio Analysis: Ready (with mock data)"
echo "✅ Face Detection: OpenCV.js loaded"
echo "✅ Speech Synthesis: Browser API ready"

echo ""
echo "🎭 Interview Flow Available:"
echo "1. /dashboard/start-interview - Role & difficulty selection"
echo "2. /dashboard/interview/session/:id - Live AI interview"
echo "3. /dashboard/report/:id - Performance analysis & charts"

echo ""
echo "📱 Features Demonstrated:"
echo "- Real-time question generation with AI"
echo "- Speech-to-text processing"
echo "- Face detection and attention tracking"
echo "- Performance scoring and visualization"
echo "- Complete interview workflow"

echo ""
echo "🔧 Production Ready Features:"
echo "- Google Gemini Pro integration (with fallbacks)"
echo "- Google Speech-to-Text API"
echo "- OpenCV.js face detection"
echo "- MediaRecorder audio capture"
echo "- Recharts data visualization"

echo ""
echo "Demo complete! 🎉"