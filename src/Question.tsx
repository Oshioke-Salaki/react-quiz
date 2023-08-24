import Options from './Options';

const Question: React.FC<{
  dispatch: (action: { type: string }) => void;
  curQuestion: {
    question: string;
    options: string[];
    correctOption: number;
    points: number;
  };
  answer: number | undefined;
}> = ({ curQuestion, answer, dispatch }) => {
  return (
    <div>
      <h4>{curQuestion.question}</h4>
      <Options dispatch={dispatch} answer={answer} curQuestion={curQuestion} />
    </div>
  );
};

export default Question;
