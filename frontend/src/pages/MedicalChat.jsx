import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

const MedicalChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversation_id: conversationId
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      if (!conversationId) {
        setConversationId(data.conversation_id);
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        content: data.content,
        is_emergency: data.is_emergency
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: 'I apologize, but I am unable to connect to the server right now. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-white dark:bg-medical-darkcard rounded-2xl shadow-sm border border-gray-200 dark:border-medical-darkborder overflow-hidden">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-medical-darkborder bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-medical-red/10 flex items-center justify-center">
            <Bot className="text-medical-red" size={24} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white">Medical Assistant</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
            <Bot size={48} className="text-gray-300 dark:text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">How can I help you today?</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Ask me about symptoms, medical conditions, or general health topics. 
              <br/><br/>
              <strong>Remember:</strong> I am an AI, not a doctor. I provide educational information, not medical advice.
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                msg.role === 'user' ? 'bg-medical-navy text-white' : 'bg-medical-red text-white'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-medical-navy text-white rounded-tr-sm' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm'
              }`}>
                {msg.role === 'model' ? (
                  <div className="prose dark:prose-invert max-w-none text-sm">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>
            </div>

            {/* Emergency Banner */}
            {msg.is_emergency && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 ml-11 max-w-[80%] bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg flex items-start gap-2"
              >
                <AlertTriangle className="shrink-0 mt-0.5" size={18} />
                <p className="text-sm font-medium">
                  <strong>Emergency Warning:</strong> Your symptoms may indicate a serious condition. 
                  Please seek immediate medical attention or contact emergency services.
                </p>
              </motion.div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-medical-red flex items-center justify-center text-white">
              <Bot size={16} />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-medical-darkcard border-t border-gray-200 dark:border-medical-darkborder">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your health-related question..."
            className="w-full bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 focus:border-medical-red focus:ring-2 focus:ring-medical-red/20 rounded-xl py-4 pl-4 pr-14 text-sm transition-all dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-medical-red text-white rounded-lg hover:bg-medical-darkred disabled:opacity-50 transition-colors"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
          AI generated information. Always consult a healthcare professional.
        </p>
      </div>
    </div>
  );
};

export default MedicalChat;
