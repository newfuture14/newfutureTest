import React from 'react';
import { ResultData } from '../types';
import PixelatedButton from './PixelatedButton';

interface ResultScreenProps {
  result: ResultData;
  onRetry: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRetry }) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 bg-white/80 border-2 border-amber-800 text-amber-900 backdrop-blur-sm">
      <h2 className="text-center text-2xl font-bold text-amber-900 mb-2">
        [ 풀이 결과 ]
      </h2>
      <p className="text-center text-lg mb-6">하늘이 내린 그대의 기질은...</p>
      
      {result.avatarImage && (
        <div className="mb-8 flex justify-center">
          <div className="bg-stone-200 p-2 border-2 border-amber-800">
            <img 
              src={result.avatarImage} 
              alt={`${result.mbtiType} 초상화`} 
              className="w-48 h-48 object-cover" 
            />
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl text-amber-900 font-bold">
          {result.mbtiType}
        </h1>
        <h3 className="text-xl md:text-2xl mt-4 font-bold">
          - {result.analysis.title} -
        </h3>
      </div>
      
      <div className="bg-amber-50/60 border border-amber-700 p-6 mb-8 text-left">
        <h4 className="text-lg font-bold text-amber-900 mb-4">
          :: 기질 풀이 ::
        </h4>
        <p className="text-lg leading-relaxed whitespace-pre-wrap">{result.analysis.description}</p>
      </div>

      <div className="bg-amber-50/60 border border-amber-700 p-6 mb-10 text-left">
        <h4 className="text-lg font-bold text-amber-900 mb-4">
          :: 학문 수련법 ::
        </h4>
        <ul className="list-none space-y-3">
          {result.analysis.studyTips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-amber-800 mr-3 text-xl font-bold">一.</span>
              <span className="text-lg">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <PixelatedButton onClick={onRetry}>
          다시 보시겠소?
        </PixelatedButton>
      </div>
    </div>
  );
};

export default ResultScreen;