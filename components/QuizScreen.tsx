import React from 'react';
import { Question, MbtiDimension } from '../types';
import PixelatedButton from './PixelatedButton';
import ProgressBar from './ProgressBar';

interface QuizScreenProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswer: (type: MbtiDimension) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ question, currentQuestionIndex, totalQuestions, onAnswer }) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 bg-white/70 border-2 border-amber-800 text-amber-900 backdrop-blur-sm">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 font-bold text-sm">
          <span>진행</span>
          <span>{currentQuestionIndex + 1} / {totalQuestions}</span>
        </div>
        <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
      </div>
      
      <div className="text-center bg-amber-50/50 border-2 border-amber-700 p-6 my-8 min-h-[120px] flex items-center justify-center">
        <p className="text-xl md:text-2xl leading-relaxed">{question.text}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PixelatedButton onClick={() => onAnswer(question.options[0].type)}>
          {question.options[0].text}
        </PixelatedButton>
        <PixelatedButton onClick={() => onAnswer(question.options[1].type)}>
          {question.options[1].text}
        </PixelatedButton>
      </div>
    </div>
  );
};

export default QuizScreen;