import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Activity, FileText, Image as ImageIcon, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    {
      title: "Medical Chat Assistant",
      description: "Ask health-related questions and get patient-friendly educational explanations.",
      icon: <MessageSquare size={32} className="text-medical-red" />,
      path: "/chat",
      color: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-100 dark:border-red-900/30"
    },
    {
      title: "Symptom Checker",
      description: "Discuss symptoms to learn about potential causes. Identifies emergency red-flags.",
      icon: <Activity size={32} className="text-blue-500" />,
      path: "/symptom-checker",
      color: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-100 dark:border-blue-900/30"
    },
    {
      title: "Report Analyzer",
      description: "Upload PDF medical reports for simplified summaries and key findings.",
      icon: <FileText size={32} className="text-emerald-500" />,
      path: "/report-analyzer",
      color: "bg-emerald-50 dark:bg-emerald-900/20",
      borderColor: "border-emerald-100 dark:border-emerald-900/30"
    },
    {
      title: "Image Observations",
      description: "Upload medical images (like skin rashes) for educational AI observations.",
      icon: <ImageIcon size={32} className="text-purple-500" />,
      path: "/image-analyzer",
      color: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-100 dark:border-purple-900/30"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 py-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-medical-red/10 text-medical-red dark:bg-medical-red/20 font-medium text-sm mb-4">
          <ShieldCheck size={16} />
          <span>Safe & Private AI Healthcare</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-medical-navy dark:text-white tracking-tight">
          Your Intelligent <span className="text-medical-red">Medical Assistant</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
          Empowering patients with clear, educational, and safe health information powered by advanced AI.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={feature.path} className="block group h-full">
              <div className={`h-full p-8 rounded-2xl border ${feature.borderColor} bg-white dark:bg-medical-darkcard hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {feature.description}
                </p>
                <div className="flex items-center text-medical-red font-medium opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  Try it now <ArrowRight size={18} className="ml-2" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="bg-medical-navy dark:bg-medical-darkcard rounded-3xl p-8 md:p-12 text-white mt-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-transparent dark:border-medical-darkborder">
        <div className="space-y-4 max-w-xl">
          <h2 className="text-3xl font-bold">Privacy First. Safety Always.</h2>
          <p className="text-gray-300">
            We prioritize your safety. Our AI is designed to recognize emergency red-flags, refuses to provide definitive diagnoses, and ensures your uploaded documents remain completely private.
          </p>
        </div>
        <Link to="/how-it-works" className="bg-medical-red hover:bg-medical-darkred text-white px-8 py-3 rounded-xl font-semibold transition-colors shrink-0">
          Learn How It Works
        </Link>
      </div>
    </div>
  );
};

export default Home;
