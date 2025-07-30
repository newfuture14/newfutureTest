import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-amber-900 p-8">
      <div className="text-3xl mb-6 font-bold animate-pulse">
        잠시, 기다림의 미학...
      </div>
      <p className="text-xl text-center">
        그대의 기질을 헤아려<br/>초상화를 그리고 있나니...
      </p>
    </div>
  );
};

export default LoadingIndicator;