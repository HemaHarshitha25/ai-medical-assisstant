import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DisclaimerBanner = () => {
  return (
    <div className="bg-amber-100 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800 p-3 px-6 flex items-start sm:items-center gap-3 shadow-sm z-10 relative">
      <AlertTriangle className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5 sm:mt-0" size={20} />
      <p className="text-sm text-amber-800 dark:text-amber-200 leading-snug">
        <strong className="font-semibold mr-1">Educational Purposes Only:</strong>
        This AI Medical Assistant is NOT a substitute for professional medical advice, diagnosis, or treatment. 
        Always consult a qualified healthcare provider for medical concerns.
      </p>
    </div>
  );
};

export default DisclaimerBanner;
