import React from 'react';

const LoadingDots: React.FC = () => {
  return (
    <div className="flex space-x-1">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-2 w-2 rounded-full bg-gray-400 animate-[bounce_1s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
};

export default LoadingDots;