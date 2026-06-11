import React from 'react';

const PrivacyPolicy = () => (
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

export default PrivacyPolicy;
