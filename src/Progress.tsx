import React from 'react';
import { useQuiz } from './context/QuizContext';

const Progress: React.FC = () => {
  const { numQuestions, index, answer, points, maxPoints } = useQuiz();
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== undefined)}
      />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
};

export default Progress;
