import React, { useState } from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

// Text prompt field
const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt }) => {
  const maxLength = 300;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setPrompt(e.target.value);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
        Prompt
      </label>
      <div className="relative">
        <textarea
          id="prompt"
          value={prompt}
          onChange={handleChange}
          placeholder="Roblox character in a futuristic city, wearing a glowing suit, with neon lights in the background..."
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 h-32 resize-none"
        />
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          {prompt.length} / {maxLength}
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
