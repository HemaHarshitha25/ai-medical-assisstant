import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, Loader2, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import html2pdf from 'html2pdf.js';

const ReportAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      setError(null);
    } else {
      setFile(null);
      setError('Please upload a valid PDF file.');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/analyze/report`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze report');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing the report.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!resultRef.current) return;
    
    const opt = {
      margin:       1,
      filename:     'medical_report_summary.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(resultRef.current).save();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl p-8 border border-emerald-100 dark:border-emerald-900/30 text-center">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="text-emerald-600 dark:text-emerald-400" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Medical Report Analyzer</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Upload your lab results or medical reports (PDF). Our AI will summarize the findings in plain, easy-to-understand language.
        </p>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl flex items-start gap-3">
        <ShieldCheck className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="font-semibold text-blue-900 dark:text-blue-100">Privacy Notice</h4>
          <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
            Uploaded reports may contain sensitive medical information. Please avoid uploading personal identifiers if possible. Files are processed securely and are not used to train our AI models. This application is intended for educational use only.
          </p>
        </div>
      </div>

      {/* Upload Section */}
      {!result && (
        <div className="bg-white dark:bg-medical-darkcard rounded-2xl p-8 border border-gray-200 dark:border-medical-darkborder shadow-sm text-center">
          <div 
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 transition-colors hover:border-emerald-500 dark:hover:border-emerald-500 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => document.getElementById('file-upload').click()}
          >
            <Upload size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {file ? file.name : "Click to upload or drag and drop"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PDF files only (max 10MB)
            </p>
            <input 
              id="file-upload" 
              type="file" 
              accept=".pdf" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </div>

          {error && (
            <p className="text-red-500 mt-4 text-sm font-medium">{error}</p>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="mt-6 w-full md:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Analyzing Report...
              </>
            ) : (
              <>
                <FileText size={20} />
                Analyze Report
              </>
            )}
          </button>
        </div>
      )}

      {/* Results Section */}
      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analysis Results</h2>
            <div className="flex gap-3">
               <button 
                onClick={() => { setResult(null); setFile(null); }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white"
              >
                Upload Another
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Download size={16} /> Download PDF
              </button>
            </div>
          </div>

          <div ref={resultRef} className="bg-white dark:bg-medical-darkcard rounded-2xl p-8 border border-gray-200 dark:border-medical-darkborder shadow-sm space-y-8">
            <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-700">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Report Summary: {result.filename}</h3>
               <p className="text-xs text-gray-500">Generated by AI Medical Assistant. For educational purposes only.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <FileText className="text-emerald-500" size={20} /> General Summary
              </h4>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-gray-700 dark:text-gray-300">
                {result.summary}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="text-blue-500" size={20} /> Key Findings
                </h4>
                <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl text-gray-700 dark:text-gray-300 h-full">
                   {result.key_findings}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <AlertCircle className="text-amber-500" size={20} /> Potential Concerns
                </h4>
                <div className="p-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-xl text-gray-700 dark:text-gray-300 h-full">
                  {result.potential_concerns}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Activity className="text-medical-red" size={20} /> Recommended Questions for Your Doctor
              </h4>
              <div className="p-4 bg-red-50/50 dark:bg-red-900/10 rounded-xl text-gray-700 dark:text-gray-300 border border-red-100 dark:border-red-900/30">
                {result.recommended_next_steps}
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 italic text-center">
              Disclaimer: This summary was generated by an AI model and may contain errors. It is not a medical diagnosis. Always review your actual report with your healthcare provider.
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReportAnalyzer;
