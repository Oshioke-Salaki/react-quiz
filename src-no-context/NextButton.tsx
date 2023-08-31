import React from 'react';

const NextButton: React.FC<{
  dispatch: (action: { type: string }) => void;
  answer: number | undefined;
  index: number;
  numQuestions: number;
}> = ({ dispatch, answer, index, numQuestions }) => {
  if (answer === undefined) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'finish' })}
      >
        Finish
      </button>
    );
};

export default NextButton;
