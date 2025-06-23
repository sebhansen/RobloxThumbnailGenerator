import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CanvasEditor from '../components/CanvasEditor';
import ImageUploader from '../components/ImageUploader';
import PromptInput from '../components/PromptInput';
import StyleSelector from '../components/StyleSelector';
import TextEditor from '../components/TextEditor';

// Drawing + prompt + upload UI
const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [artStyle, setArtStyle] = useState<string>('cinematic');
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<any | null>(null);
  const canvasRef = useRef<any>(null);
  const navigate = useNavigate();

  const handleImageUpload = (base64: string) => {
    setUploadedImage(base64);
    setError(null); // Clear error on new image
  };

  const handleSelectText = (text: any) => {
    setSelectedText(text);
  };

  const handleDeselectText = () => {
    if (selectedText && canvasRef.current) {
      canvasRef.current.finalizeTextEdit();
    }
    setSelectedText(null);
  };

  const handleTextChange = (newText: string) => {
    if (selectedText && canvasRef.current) {
      setSelectedText({ ...selectedText, text: newText });
      canvasRef.current.updateText(selectedText.id, newText);
    }
  };

  const handleRemoveText = () => {
    if (selectedText && canvasRef.current) {
      canvasRef.current.removeText(selectedText.id);
      setSelectedText(null);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !canvasRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const imageData = canvasRef.current.exportImage();
      if (!imageData) {
        throw new Error("Could not export image from canvas.");
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          artStyle,
          aspectRatio,
          imageData, // This is the DataURL from the canvas
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
        throw new Error(errorData.message || 'An unknown error occurred.');
      }

      const results = await response.json();
      navigate('/results', { state: { results } });

    } catch (err: any) {
      setError(err.message || 'Failed to generate thumbnails. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel: Controls */}
        <div className="lg:col-span-1 bg-gray-800/50 p-6 rounded-lg border border-gray-700 self-start">
          <h2 className="text-2xl font-bold mb-4">Generate Roblox Thumbnail</h2>
          <p className="text-gray-400 mb-6">Add your sketch, add text and draw whatever you want! You can also add a prompt to specify exactly what you want</p>
          
          {error && <p className="text-red-500 bg-red-900/50 p-3 rounded-md my-4 text-sm">{error}</p>}

          {selectedText ? (
            <TextEditor 
              text={selectedText.text}
              onTextChange={handleTextChange}
              onRemove={handleRemoveText}
              onDone={handleDeselectText}
            />
          ) : (
            <>
              <PromptInput prompt={prompt} setPrompt={setPrompt} />
              <StyleSelector
                artStyle={artStyle}
                setArtStyle={setArtStyle}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
              />
              
              <button 
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:opacity-90 transition-opacity mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={!uploadedImage || isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  'Generate Image'
                )}
              </button>
            </>
          )}
        </div>

        {/* Right Panel: Canvas/Uploader */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 min-h-[600px] flex items-center justify-center">
            {uploadedImage ? (
              <CanvasEditor 
                ref={canvasRef} 
                image={uploadedImage} 
                onImageChange={() => setUploadedImage(null)} 
                onSelectText={handleSelectText}
                onDeselectText={handleDeselectText}
                isEditingText={selectedText !== null}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <h3 className="text-2xl font-bold mb-4">Make your idea come to life</h3>
                <p className="text-gray-400 mb-6">Start by uploading your sketch</p>
                <ImageUploader onImageUpload={handleImageUpload} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
