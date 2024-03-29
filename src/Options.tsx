import React from 'react';
import { useQuiz } from './context/QuizContext';

const Options: React.FC<{
  question: {
    question: string;
    options: string[];
    correctOption: number;
    points: number;
  };
}> = ({ question }) => {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== undefined;
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer && 'answer'} ${
            hasAnswered
              ? i === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() =>
            dispatch({ type: 'newAnswer', payload: { answer: i } })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
