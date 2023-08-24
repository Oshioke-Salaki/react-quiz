import React from 'react';

const Progress: React.FC<{
  index: number;
  numQuestions: number;
  points: number;
  maxPoints: number;
  answer: number | undefined;
}> = ({ index, numQuestions, points, maxPoints, answer }) => {
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
