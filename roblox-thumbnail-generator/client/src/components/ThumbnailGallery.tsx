import React from 'react';

interface Thumbnail {
  url: string;
  isLocked: boolean;
}

interface ThumbnailGalleryProps {
  thumbnails: Thumbnail[];
}

const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({ thumbnails }) => {
  const handleUnlock = () => {
    // TODO: Implement Stripe Checkout
    console.log('Unlocking images...');
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {thumbnails.map((thumb, index) => (
          <div key={index} className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-700 shadow-lg hover:shadow-purple-500/50 transition-shadow duration-300">
            <img src={thumb.url} alt={`Generated Thumbnail ${index + 1}`} className={`w-full h-full object-cover transition-all duration-300 ${thumb.isLocked ? 'blur-md scale-110' : ''}`} />
            {thumb.isLocked && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <svg className="w-12 h-12 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={handleUnlock}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-full text-xl transition-transform transform hover:scale-105 shadow-lg"
        >
          Unlock All Images for $5
        </button>
        <p className="text-gray-400 mt-3 text-sm">Unlock all 5 images in full 1920x1080 resolution without watermarks.</p>
      </div>
    </div>
  );
};

export default ThumbnailGallery;
