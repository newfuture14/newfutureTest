import React from 'react';

interface PixelatedButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const PixelatedButton: React.FC<PixelatedButtonProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-transparent text-amber-900 font-bold text-lg sm:text-xl py-3 px-6 border-2 border-amber-800 hover:bg-amber-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};

export default PixelatedButton;