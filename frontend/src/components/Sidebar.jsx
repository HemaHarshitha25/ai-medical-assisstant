import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MessageSquare, 
  Activity, 
  FileText, 
  Image as ImageIcon, 
  Info, 
  ShieldAlert, 
  Lock, 
  HelpCircle,
  Moon,
  Sun,
  ActivitySquare
} from 'lucide-react';

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  const navItems = [
    { name: 'Home', path: '/', icon: <ActivitySquare size={20} /> },
    { name: 'Medical Chat', path: '/chat', icon: <MessageSquare size={20} /> },
    { name: 'Symptom Checker', path: '/symptom-checker', icon: <Activity size={20} /> },
    { name: 'Report Analyzer', path: '/report-analyzer', icon: <FileText size={20} /> },
    { name: 'Image Analyzer', path: '/image-analyzer', icon: <ImageIcon size={20} /> },
  ];

  const bottomNavItems = [
    { name: 'How It Works', path: '/how-it-works', icon: <HelpCircle size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Disclaimer', path: '/disclaimer', icon: <ShieldAlert size={18} /> },
    { name: 'Privacy Policy', path: '/privacy-policy', icon: <Lock size={18} /> },
  ];

  return (
    <div className="w-64 h-full bg-white dark:bg-medical-darkcard border-r border-gray-200 dark:border-medical-darkborder flex flex-col transition-colors duration-300">
      <div className="p-6 flex items-center gap-3 border-b border-gray-200 dark:border-medical-darkborder">
        <div className="w-10 h-10 rounded-full bg-medical-red flex items-center justify-center text-white font-bold text-xl">
          AI
        </div>
        <div>
          <h1 className="font-bold text-medical-navy dark:text-white leading-tight">Medical</h1>
          <h2 className="text-sm text-gray-500 dark:text-gray-400 leading-tight">Assistant Bot</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4 scrollbar-hide">
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-2">
          Tools
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-medical-red/10 text-medical-red dark:bg-medical-red/20 dark:text-medical-red font-medium' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}

        <div className="mt-8 mb-2 px-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          Information
        </div>
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                isActive 
                  ? 'text-medical-navy font-semibold dark:text-white bg-gray-50 dark:bg-gray-800' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-medical-darkborder">
        <button 
          onClick={toggleDarkMode}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
