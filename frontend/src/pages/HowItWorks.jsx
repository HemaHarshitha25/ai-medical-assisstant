import React from 'react';
import { Bot, ShieldAlert, Cpu, Lock, FileText, Image as ImageIcon } from 'lucide-react';

const HowItWorks = () => {
  const sections = [
    {
      title: "1. Model & Architecture",
      icon: <Cpu className="text-blue-500" size={24} />,
      content: "This application is powered by Google's Gemini 1.5 API, utilizing its multimodal capabilities. The frontend is built with React and Tailwind CSS, while the backend uses Python's FastAPI and a SQLite database. The architecture is modular, allowing the underlying AI provider to be swapped if needed."
    },
    {
      title: "2. Chat & Symptom Workflow",
      icon: <Bot className="text-green-500" size={24} />,
      content: "When you send a message, it is processed by our backend and securely passed to the AI model. A strict 'System Prompt' forces the AI to respond in patient-friendly language, explicitly avoid making definitive diagnoses, and append necessary medical disclaimers to its advice."
    },
    {
      title: "3. Safety & Emergency Detection",
      icon: <ShieldAlert className="text-medical-red" size={24} />,
      content: "Patient safety is our primary concern. A separate rule-based guardrail analyzes user input before it hits the AI. If severe symptoms (e.g., chest pain, severe bleeding) are detected, the system immediately triggers a visual Emergency Red-Flag warning, overriding normal conversational tone to urge immediate medical attention."
    },
    {
      title: "4. Report Analysis Workflow",
      icon: <FileText className="text-emerald-500" size={24} />,
      content: "PDF medical reports are uploaded directly to the secure backend where text is extracted locally using pdfplumber. Only the extracted text is sent to the AI, accompanied by a prompt requesting a structured, educational summary (General Findings, Key Values, Concerns, and Questions for the Doctor). The original file is not permanently stored."
    },
    {
      title: "5. Image Analysis Workflow",
      icon: <ImageIcon className="text-purple-500" size={24} />,
      content: "Uploaded images are analyzed using the Gemini Vision model. The AI is heavily constrained to provide only 'educational observations' and is strictly forbidden from offering visual diagnoses (e.g., it will not say 'you have melanoma', but might say 'this appears to be a pigmented lesion, please show it to a dermatologist')."
    },
    {
      title: "6. Privacy & Data Handling",
      icon: <Lock className="text-amber-500" size={24} />,
      content: "This is a demonstration application. While your chat history is stored locally in the SQLite database to maintain conversation context, files (PDFs/Images) are processed entirely in memory and are discarded after analysis. Data is not used to train the underlying models."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4 pt-8 pb-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">How It Works</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Transparency in AI healthcare. Understand the technology and workflows powering your medical assistant.
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white dark:bg-medical-darkcard rounded-2xl p-6 border border-gray-200 dark:border-medical-darkborder shadow-sm flex flex-col md:flex-row gap-6 items-start">
            <div className="shrink-0 w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-100 dark:border-gray-700">
              {section.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{section.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {section.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
