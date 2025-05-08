import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Define available models for selection
const availableModels = [
  { id: "nvidia/llama-3.1-nemotron-ultra-253b-v1:free", name: "Llama 3.1 Nemotron Ultra 253B (Recommended)" },
  { id: "deepseek/deepseek-prover-v2:free", name: "DeepSeek Prover V2" },
  { id: "agentica-org/deepcoder-14b-preview:free", name: "DeepCoder 14B" },
  { id: "meta-llama/llama-4-maverick:free", name: "Llama 4 Maverick" }
];

// Create a global variable to store the selected model
let selectedModelId = "nvidia/llama-3.1-nemotron-ultra-253b-v1:free";

// Export a function to get the currently selected model
export const getSelectedModel = () => selectedModelId;

const ModelSelector: React.FC = () => {
  const [modelId, setModelId] = useState(selectedModelId);

  const handleModelChange = (value: string) => {
    setModelId(value);
    selectedModelId = value;
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 text-sm hover:bg-gray-100"
          type="button"
        >
          <Settings className="h-3.5 w-3.5" />

        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI Model Settings</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model-select">Select AI Model</Label>
              <Select value={modelId} onValueChange={handleModelChange}>
                <SelectTrigger id="model-select">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map(model => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Choose a different model if the current one isn't working as expected.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModelSelector; 