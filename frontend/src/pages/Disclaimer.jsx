import React from 'react';

const Disclaimer = () => (
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

export default Disclaimer;
