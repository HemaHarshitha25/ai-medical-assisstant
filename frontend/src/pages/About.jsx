import React from 'react';

const About = () => (
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

export default About;
