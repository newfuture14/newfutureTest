import React, { useState, useCallback, useEffect } from 'react';
import { GameState, MbtiDimension, MbtiScores, ResultData } from './types';
import { QUIZ_QUESTIONS } from './constants';
import { getLearningStyleAnalysis, generateMbtiAvatar } from './services/geminiService';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import LoadingIndicator from './components/LoadingIndicator';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [scores, setScores] = useState<MbtiScores>({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [result, setResult] = useState<ResultData | null>(null);

  const handleStart = () => {
    setGameState(GameState.Quiz);
  };

  const handleRetry = () => {
    setGameState(GameState.Start);
    setCurrentQuestionIndex(0);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    setResult(null);
  };

  const calculateMbtiType = useCallback(() => {
    const type1 = scores.E >= scores.I ? 'E' : 'I';
    const type2 = scores.S >= scores.N ? 'S' : 'N';
    const type3 = scores.T >= scores.F ? 'T' : 'F';
    const type4 = scores.J >= scores.P ? 'J' : 'P';
    return `${type1}${type2}${type3}${type4}`;
  }, [scores]);

  const fetchResults = useCallback(async () => {
    const mbtiType = calculateMbtiType();

    // First, get the text analysis to have a title for the avatar prompt
    const analysis = await getLearningStyleAnalysis(mbtiType);
    
    // If analysis fails, we can still show a result, just without an avatar.
    let avatarImage = "";
    if (analysis.title !== "풀이 오류") {
        avatarImage = await generateMbtiAvatar(mbtiType, analysis.title);
    }
    
    setResult({ mbtiType, analysis, avatarImage });
    setGameState(GameState.Result);
  }, [calculateMbtiType]);
  

  const handleAnswer = (type: MbtiDimension) => {
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
    
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState(GameState.Loading);
    }
  };

  useEffect(() => {
    if (gameState === GameState.Loading) {
      fetchResults();
    }
  }, [gameState, fetchResults]);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Start:
        return <StartScreen onStart={handleStart} />;
      case GameState.Quiz:
        return (
          <QuizScreen
            question={QUIZ_QUESTIONS[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={QUIZ_QUESTIONS.length}
            onAnswer={handleAnswer}
          />
        );
      case GameState.Loading:
        return <LoadingIndicator />;
      case GameState.Result:
        return result ? <ResultScreen result={result} onRetry={handleRetry} /> : <LoadingIndicator />;
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-200 bg-cover bg-center" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')"}}>
      <main className="flex-grow flex items-center justify-center p-4">
        {renderContent()}
      </main>
      <footer className="w-full text-center py-4 text-amber-900/60 text-sm">
        © 2025 신미래
      </footer>
    </div>
  );
};

export default App;
