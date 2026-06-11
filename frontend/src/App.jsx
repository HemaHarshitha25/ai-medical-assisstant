import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DisclaimerBanner from './components/DisclaimerBanner';
import Home from './pages/Home';
import MedicalChat from './pages/MedicalChat';
import SymptomChecker from './pages/SymptomChecker';
import ReportAnalyzer from './pages/ReportAnalyzer';
import ImageAnalyzer from './pages/ImageAnalyzer';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Disclaimer from './pages/Disclaimer';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-medical-light dark:bg-medical-darkbg">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <DisclaimerBanner />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<MedicalChat />} />
              <Route path="/symptom-checker" element={<SymptomChecker />} />
              <Route path="/report-analyzer" element={<ReportAnalyzer />} />
              <Route path="/image-analyzer" element={<ImageAnalyzer />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
