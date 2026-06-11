import React, { useState } from 'react';
import { Upload, Image as ImageIcon, AlertTriangle, Loader2, ShieldCheck, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const ImageAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && (selected.type === 'image/jpeg' || selected.type === 'image/png')) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setError(null);
      setResult(null);
    } else {
      setFile(null);
      setPreviewUrl(null);
      setError('Please upload a valid JPG or PNG image.');
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
      const response = await fetch(`${apiUrl}/api/analyze/image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing the image.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-8 border border-purple-100 dark:border-purple-900/30 text-center">
        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="text-purple-600 dark:text-purple-400" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Medical Image Observations</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Upload an image (like a skin rash) for general AI observations. 
          <strong className="text-purple-700 dark:text-purple-300 ml-1">This tool cannot diagnose conditions.</strong>
        </p>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl flex items-start gap-3">
        <ShieldCheck className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="font-semibold text-blue-900 dark:text-blue-100">Privacy & Safety Notice</h4>
          <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
            Do not upload images containing faces or identifying marks. Images are processed temporarily and not saved. AI observations are highly uncertain and for educational purposes only.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white dark:bg-medical-darkcard rounded-2xl p-6 border border-gray-200 dark:border-medical-darkborder shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upload Image</h3>
          
          <div 
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 transition-colors hover:border-purple-500 dark:hover:border-purple-500 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden h-64"
            onClick={() => document.getElementById('image-upload').click()}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-contain p-2" />
            ) : (
              <>
                <Upload size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1 text-center">
                  Click to upload image
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">JPG or PNG</p>
              </>
            )}
            <input 
              id="image-upload" 
              type="file" 
              accept=".jpg,.jpeg,.png" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </div>

          {error && (
            <p className="text-red-500 mt-4 text-sm font-medium">{error}</p>
          )}

          <div className="mt-6 flex gap-3">
             <button
              onClick={() => { setFile(null); setPreviewUrl(null); setResult(null); setError(null); }}
              disabled={!file || isUploading}
              className="flex-1 py-3 border border-gray-300 dark:border-gray-600 disabled:opacity-50 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="flex-[2] py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing...
                </>
              ) : (
                <>
                  <Eye size={20} />
                  Analyze Image
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white dark:bg-medical-darkcard rounded-2xl p-6 border border-gray-200 dark:border-medical-darkborder shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Observations</h3>
          
          {result ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="p-4 bg-purple-50/50 dark:bg-purple-900/10 rounded-xl text-gray-800 dark:text-gray-200 leading-relaxed text-sm border border-purple-100 dark:border-purple-900/30 whitespace-pre-wrap">
                {result.observation}
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-xl flex items-start gap-3 mt-6">
                <AlertTriangle className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100">Confidence Disclaimer</h4>
                  <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                    AI visual analysis is prone to errors and cannot identify medical conditions reliably. Do not use this observation to make health decisions.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
              <Eye size={48} className="mb-4 text-gray-300 dark:text-gray-600" />
              <p>Upload an image and click analyze to see observations here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;
