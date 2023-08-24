import React from 'react';

const Options: React.FC<{
  dispatch: (action: { type: string; payload: { answer: number } }) => void;
  curQuestion:
    | {
        question: string;
        options: string[];
        correctOption: number;
        points: number;
      }
    | undefined;
  answer: number | undefined;
}> = ({ dispatch, answer, curQuestion }) => {
  const hasAnswered = answer !== undefined;
  return (
    <div className="options">
      {curQuestion?.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer && 'answer'} ${
            hasAnswered
              ? i === curQuestion!.correctOption
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
