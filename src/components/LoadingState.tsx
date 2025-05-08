import React from 'react';
import { Loader2, Sparkles, Brain, Users, Target, Heart } from 'lucide-react';
import { getSelectedModel } from './APIDebugger';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Generating personas with AI...' }) => {
  // Get the current model ID and format it for display
  const modelId = getSelectedModel();
  const modelName = modelId.split('/').pop()?.replace('-', ' ') || modelId;
  
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main loading animation */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-12 h-12 text-purple-600 animate-bounce" style={{ animationDuration: '2s' }} />
        </div>
        <div className="absolute -top-2 -right-2">
          <Sparkles className="w-6 h-6 text-yellow-400 animate-ping" style={{ animationDuration: '3s' }} />
        </div>
      </div>

      {/* Loading message */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{message}</h3>
      <p className="text-gray-600 mb-8">Using {modelName} to create detailed personas</p>

      {/* Progress indicators */}
      <div className="grid grid-cols-3 gap-6 max-w-2xl w-full mb-8">
        <div className="flex flex-col items-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-purple-100">
          <Users className="w-6 h-6 text-purple-600 mb-2" />
          <span className="text-sm text-gray-600">Demographics</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-indigo-100">
          <Target className="w-6 h-6 text-indigo-600 mb-2" />
          <span className="text-sm text-gray-600">Goals & Needs</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-pink-100">
          <Heart className="w-6 h-6 text-pink-600 mb-2" />
          <span className="text-sm text-gray-600">Personality</span>
        </div>
      </div>

      {/* Info box */}
      <div className="max-w-md bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm">
        <h4 className="font-medium text-gray-800 mb-3">What's happening?</h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
            Analyzing your description
          </li>
          <li className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" style={{ animationDelay: '0.2s' }} />
            Generating user profiles
          </li>
          <li className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-pink-600 animate-spin" style={{ animationDelay: '0.4s' }} />
            Creating detailed personas
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoadingState; 