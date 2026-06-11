import React from 'react';

export const About = () => (
  <div className="max-w-3xl mx-auto space-y-6 py-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">About the AI Medical Assistant</h1>
    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
      <p>
        The AI Medical Assistant Bot was developed as a demonstration of applying Large Language Models to healthcare in a safe, responsible, and privacy-conscious manner.
      </p>
      <p>
        The goal of this project is to provide a user-friendly interface where individuals can learn about medical conditions, explore their symptoms, and understand their medical reports without feeling overwhelmed by complex jargon.
      </p>
      <h3>Core Principles</h3>
      <ul>
        <li><strong>Safety First:</strong> Built-in guardrails prevent the AI from giving definitive diagnoses or prescribing treatments.</li>
        <li><strong>Educational Focus:</strong> All information is structured to empower the patient with knowledge, encouraging them to have more informed discussions with their human doctor.</li>
        <li><strong>Accessibility:</strong> Complex medical texts are simplified, making healthcare information more accessible to everyone.</li>
      </ul>
      <p className="mt-8 text-sm italic">Developed for demonstration and educational purposes only.</p>
    </div>
  </div>
);

export const Disclaimer = () => (
  <div className="max-w-3xl mx-auto space-y-6 py-8">
    <h1 className="text-3xl font-bold text-medical-red">Medical Disclaimer</h1>
    <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-200 dark:border-red-900/30 text-gray-800 dark:text-gray-200 space-y-4">
      <p className="font-bold text-lg">
        This application is for educational and informational purposes only and is NOT a substitute for professional medical advice, diagnosis, or treatment.
      </p>
      <p>
        Never disregard professional medical advice or delay in seeking it because of something you have read on this application. Always consult with a qualified healthcare provider regarding any medical condition or treatment.
      </p>
      <p>
        <strong>If you think you may have a medical emergency, call your doctor or emergency services immediately.</strong>
      </p>
      <p>
        The AI models powering this application can make mistakes. They do not have access to your full medical history and cannot conduct a physical examination. Reliance on any information provided by this application is solely at your own risk.
      </p>
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <div className="max-w-3xl mx-auto space-y-6 py-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
      <p>Your privacy is critically important to us. This notice explains how data is handled when you use the AI Medical Assistant.</p>
      
      <h3>1. Data Processing</h3>
      <p>When you interact with the chat or upload reports/images, the data is processed securely to generate a response. Files uploaded for analysis are processed in memory and are not permanently saved to our servers.</p>
      
      <h3>2. AI Model Training</h3>
      <p>The information and files you provide are <strong>not</strong> used to train the underlying AI models. We rely on enterprise APIs that explicitly opt-out of using customer data for model training.</p>
      
      <h3>3. Local Storage</h3>
      <p>Your conversation history is stored locally in the application's database to allow you to review previous discussions. You have full control over this data.</p>
      
      <h3>4. Sensitive Information</h3>
      <p>We strongly recommend that you remove any Personally Identifiable Information (PII) such as your name, address, or social security number from any medical reports before uploading them for analysis.</p>
    </div>
  </div>
);
