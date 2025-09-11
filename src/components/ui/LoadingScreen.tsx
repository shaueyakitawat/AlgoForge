import React from 'react';
import { TrendingUp } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center animate-pulse">
            <TrendingUp className="h-7 w-7 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            AlgoForge
          </span>
        </div>
        <div className="space-y-4">
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-300 text-lg">Loading your trading platform...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;