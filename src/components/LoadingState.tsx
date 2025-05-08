import React from 'react';
import { Loader2 } from 'lucide-react';
import { getSelectedModel } from '@/components/APIDebugger';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Generating personas with AI...' }) => {
  // Get the current model ID and format it for display
  const modelId = getSelectedModel();
  const modelName = modelId.split('/').pop()?.replace('-', ' ') || modelId;
  
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 rounded-full opacity-75"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
        <Loader2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-purple-600 animate-spin" />
      </div>
      <p className="mt-4 text-gray-600">{message}</p>
      <div className="mt-6 max-w-md">
        <div className="bg-gray-100 rounded-md p-4 text-xs text-gray-500">
          <p>Using the <span className="font-medium">{modelName}</span> model to create:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Detailed user personas</li>
            <li>Realistic goals & pain points</li>
            <li>Demographic information</li>
            <li>Personality traits</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoadingState; 