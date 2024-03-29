import React from 'react';
import { useQuiz } from './context/QuizContext';

const FinishedScreen: React.FC = () => {
  const { points, maxPoints, highscore, dispatch } = useQuiz();
  const percentage: number = (points / maxPoints) * 100;
  let emoji: string = '';
  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 50 && percentage < 80) emoji = '😊';
  if (percentage > 0 && percentage < 50) emoji = '🙄';
  if (percentage === 0) emoji = '🤦‍♂️';

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{' '}
        {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Hightscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart quiz
      </button>
    </>
  );
};

export default FinishedScreen;
