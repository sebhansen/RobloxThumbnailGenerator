import React from 'react';

interface TextEditorProps {
  text: string;
  onTextChange: (newText: string) => void;
  onRemove: () => void;
  onDone: () => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ text, onTextChange, onRemove, onDone }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Edit Text</h3>
      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        className="w-full h-32 bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
        placeholder="Enter your text..."
      />
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={onDone}
          className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
        >
          Done
        </button>
        <button 
          onClick={onRemove}
          className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Remove Text
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
