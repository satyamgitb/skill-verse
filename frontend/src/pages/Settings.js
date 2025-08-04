import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { 
  User,
  Bell,
  Shield,
  Palette,
  Volume2,
  Monitor,
  Globe,
  Download,
  Trash2,
  Save,
  Eye,
  Lock,
  Smartphone,
  Mail,
  Key
} from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    // Profile
    fullName: "Alex Thompson",
    email: "alex.thompson@skillverse.com",
    username: "alexdev",
    bio: "Full-stack developer passionate about algorithms and system design",
    
    // Privacy
    profilePublic: true,
    showEmail: false,
    showProgress: true,
    allowMessages: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    interviewReminders: true,
    practiceReminders: false,
    weeklyReport: true,
    
    // Appearance
    theme: "dark",
    accentColor: "blue",
    fontSize: "medium",
    animations: true,
    
    // Audio
    masterVolume: 75,
    effectsVolume: 60,
    voiceSpeed: "normal",
    micSensitivity: 70,
    
    // Language
    language: "en",
    timezone: "UTC-8",
    dateFormat: "MM/DD/YYYY"
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    // Mock save functionality
    console.log("Settings saved:", settings);
  };

  const exportData = () => {
    // Mock export functionality
    console.log("Exporting user data...");
  };

  const deleteAccount = () => {
    // Mock delete functionality
    console.log("Account deletion requested...");
  };

  const settingSections = [
    {
      id: "profile",
      title: "Profile Settings",
      icon: User,
      content: (
        <div className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#3A86FF] to-[#C724B1] flex items-center justify-center text-white text-2xl font-bold">
              AT
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="border-white/20 text-white">
                Change Photo
              </Button>
              <p className="text-xs text-gray-400">Recommended: 256x256px, PNG or JPG</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
              <Input
                id="fullName"
                value={settings.fullName}
                onChange={(e) => handleSettingChange("fullName", e.target.value)}
                className="glass-input bg-black/30 border-white/20 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">Username</Label>
              <Input
                id="username"
                value={settings.username}
                onChange={(e) => handleSettingChange("username", e.target.value)}
                className="glass-input bg-black/30 border-white/20 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => handleSettingChange("email", e.target.value)}
              className="glass-input bg-black/30 border-white/20 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-gray-300">Bio</Label>
            <textarea
              id="bio"
              value={settings.bio}
              onChange={(e) => handleSettingChange("bio", e.target.value)}
              className="w-full h-24 p-3 rounded-lg glass-input bg-black/30 border-white/20 text-white placeholder:text-gray-400 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      )
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Public Profile</Label>
                <p className="text-sm text-gray-400">Allow others to see your profile</p>
              </div>
              <Switch
                checked={settings.profilePublic}
                onCheckedChange={(checked) => handleSettingChange("profilePublic", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Show Email</Label>
                <p className="text-sm text-gray-400">Display email on public profile</p>
              </div>
              <Switch
                checked={settings.showEmail}
                onCheckedChange={(checked) => handleSettingChange("showEmail", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Show Progress</Label>
                <p className="text-sm text-gray-400">Display learning progress publicly</p>
              </div>
              <Switch
                checked={settings.showProgress}
                onCheckedChange={(checked) => handleSettingChange("showProgress", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Allow Messages</Label>
                <p className="text-sm text-gray-400">Let other users send you messages</p>
              </div>
              <Switch
                checked={settings.allowMessages}
                onCheckedChange={(checked) => handleSettingChange("allowMessages", checked)}
              />
            </div>
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="space-y-4">
            <h4 className="text-white font-medium flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Account Security
            </h4>
            
            <Button variant="outline" className="w-full border-white/20 text-white justify-start">
              <Key className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            
            <Button variant="outline" className="w-full border-white/20 text-white justify-start">
              <Smartphone className="w-4 h-4 mr-2" />
              Two-Factor Authentication
            </Button>
            
            <Button variant="outline" className="w-full border-white/20 text-white justify-start">
              <Eye className="w-4 h-4 mr-2" />
              View Login History
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-white font-medium flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email Notifications
            </h4>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">General Updates</Label>
                <p className="text-sm text-gray-400">Product updates and announcements</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Interview Reminders</Label>
                <p className="text-sm text-gray-400">Notifications about upcoming interviews</p>
              </div>
              <Switch
                checked={settings.interviewReminders}
                onCheckedChange={(checked) => handleSettingChange("interviewReminders", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Practice Reminders</Label>
                <p className="text-sm text-gray-400">Daily practice reminders</p>
              </div>
              <Switch
                checked={settings.practiceReminders}
                onCheckedChange={(checked) => handleSettingChange("practiceReminders", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Weekly Report</Label>
                <p className="text-sm text-gray-400">Summary of your weekly progress</p>
              </div>
              <Switch
                checked={settings.weeklyReport}
                onCheckedChange={(checked) => handleSettingChange("weeklyReport", checked)}
              />
            </div>
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="space-y-4">
            <h4 className="text-white font-medium">Push Notifications</h4>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Browser Notifications</Label>
                <p className="text-sm text-gray-400">Real-time notifications in your browser</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: "appearance",
      title: "Appearance",
      icon: Palette,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Theme</Label>
              <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                <SelectTrigger className="glass-input bg-black/30 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300">Accent Color</Label>
              <div className="flex space-x-3">
                {["blue", "purple", "green", "orange"].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleSettingChange("accentColor", color)}
                    className={`w-8 h-8 rounded-full ${
                      color === "blue" ? "bg-[#3A86FF]" :
                      color === "purple" ? "bg-[#C724B1]" :
                      color === "green" ? "bg-green-500" :
                      "bg-orange-500"
                    } ${settings.accentColor === color ? "ring-2 ring-white" : ""}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300">Font Size</Label>
              <Select value={settings.fontSize} onValueChange={(value) => handleSettingChange("fontSize", value)}>
                <SelectTrigger className="glass-input bg-black/30 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Animations</Label>
                <p className="text-sm text-gray-400">Enable smooth animations and transitions</p>
              </div>
              <Switch
                checked={settings.animations}
                onCheckedChange={(checked) => handleSettingChange("animations", checked)}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: "audio",
      title: "Audio Settings",
      icon: Volume2,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Master Volume</Label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.masterVolume}
                  onChange={(e) => handleSettingChange("masterVolume", parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-white text-sm w-12">{settings.masterVolume}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300">Sound Effects</Label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.effectsVolume}
                  onChange={(e) => handleSettingChange("effectsVolume", parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-white text-sm w-12">{settings.effectsVolume}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300">Microphone Sensitivity</Label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.micSensitivity}
                  onChange={(e) => handleSettingChange("micSensitivity", parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-white text-sm w-12">{settings.micSensitivity}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300">Voice Speed</Label>
              <Select value={settings.voiceSpeed} onValueChange={(value) => handleSettingChange("voiceSpeed", value)}>
                <SelectTrigger className="glass-input bg-black/30 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "system",
      title: "System & Data",
      icon: Monitor,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Language</Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                <SelectTrigger className="glass-input bg-black/30 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300">Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                <SelectTrigger className="glass-input bg-black/30 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="UTC+0">Greenwich Time (UTC+0)</SelectItem>
                  <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="space-y-4">
            <h4 className="text-white font-medium">Data Management</h4>
            
            <Button variant="outline" className="w-full border-white/20 text-white justify-start" onClick={exportData}>
              <Download className="w-4 h-4 mr-2" />
              Export My Data
            </Button>
            
            <Button variant="outline" className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 justify-start" onClick={deleteAccount}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      )
    }
  ];

  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="h-full flex bg-[#0A0920]">
      {/* Settings Navigation */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 border-r border-white/10 bg-black/10 backdrop-blur-sm overflow-y-auto"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">Settings</h2>
          <nav className="space-y-2">
            {settingSections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all text-left ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-[#3A86FF]/20 to-[#C724B1]/20 border border-[#3A86FF]/30 text-white"
                      : "hover:bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.title}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </motion.div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-4xl">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {settingSections.find(s => s.id === activeSection)?.title}
                </h1>
                <p className="text-gray-400">Customize your SkillVerse experience</p>
              </div>
              
              <Button onClick={saveSettings} className="bg-[#3A86FF] hover:bg-[#3A86FF]/80 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>

            <Card className="glass-card bg-black/20 border-white/10">
              <CardContent className="p-8">
                {settingSections.find(s => s.id === activeSection)?.content}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;