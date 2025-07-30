import React from 'react';
import PixelatedButton from './PixelatedButton';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-8 md:p-12 bg-white/70 border-2 border-amber-800 text-amber-900 text-center backdrop-blur-sm">
      <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
        나의 기질 풀이
      </h1>
      <div className="w-20 h-px bg-amber-800 mx-auto my-8"></div>
      <p className="text-lg md:text-xl mb-4 leading-loose">
        벗이여, 그대 안에 숨겨진 기질이 궁금하지 아니한가?
      </p>
      <p className="text-lg md:text-xl mb-10 leading-loose">
        몇 가지 물음에 답하여, 스스로도 몰랐던 내면의 풍경을 마주해보시게.
      </p>
      <PixelatedButton onClick={onStart}>
        풀이 시작하기
      </PixelatedButton>
    </div>
  );
};

export default StartScreen;