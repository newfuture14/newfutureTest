export interface Question {
  text: string;
  options: [
    { text: string; type: MbtiDimension },
    { text: string; type: MbtiDimension }
  ];
}

export type MbtiDimension = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export type MbtiScores = {
  [key in MbtiDimension]: number;
};

export enum GameState {
  Start,
  Quiz,
  Loading,
  Result,
}

export interface ResultData {
  mbtiType: string;
  analysis: {
    title: string;
    description: string;
    studyTips: string[];
  };
  avatarImage: string;
}
