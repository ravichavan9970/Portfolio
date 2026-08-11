import { useState } from 'react';
import profileAsset from '../assets/profile.jpg';

interface AvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Avatar({ className = '', size = 'md' }: AvatarProps) {
  const [imgSrc, setImgSrc] = useState<string>(profileAsset);
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fallbacks to check sequentially if the imported asset fails
  const fallbacks = [
    '/images/profile.jpg',
    '/images/Ravindra_Chavan.png',
  ];

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-32 h-32 text-2xl md:w-40 md:h-40 md:text-3xl'
  };

  const handleImageError = () => {
    if (fallbackIndex < fallbacks.length) {
      setImgSrc(fallbacks[fallbackIndex]);
      setFallbackIndex(prev => prev + 1);
    } else {
      setHasError(true);
      setLoading(false);
    }
  };

  if (hasError) {
    return (
      <div 
        className={`rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white border-2 border-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] shrink-0 select-none ${sizeClasses[size]} ${className}`}
        style={{ contentVisibility: 'auto' }}
      >
        RC
      </div>
    );
  }

  return (
    <div className={`relative rounded-full overflow-hidden border-2 border-purple-500/40 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:border-purple-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 shrink-0 select-none ${sizeClasses[size]} ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-[#050816] flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={imgSrc}
        alt="Ravindra Chavan"
        className="w-full h-full object-cover object-top"
        onLoad={() => setLoading(false)}
        onError={handleImageError}
        loading="lazy"
      />
    </div>
  );
}
