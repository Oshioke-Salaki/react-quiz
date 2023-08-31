import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizContext = createContext();

const SECS_PER_QUESTION: number = 30;

type question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type State = {
  questions: question[];
  status: string;
  index: number;
  answer: number | undefined;
  points: number;
  highscore: number;
  secondsRemaining: number;
};

type Action = {
  type: string;
  payload?: { question: question[]; answer?: number };
};

const initialState: State = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: 'loading',
  index: 0,
  answer: undefined,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload!.question,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions?.length * SECS_PER_QUESTION,
      };
    case 'newAnswer':
      // eslint-disable-next-line no-case-declarations
      const question: question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload!.answer,
        points:
          action.payload!.answer === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: undefined };

    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...state,
        status: 'ready',
        index: 0,
        answer: undefined,
        points: 0,
      };

    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };

    default:
      throw new Error('Action Unknown');
  }
}

const QuizProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints: number = questions?.reduce(
    (acc: number, curr: question) => acc + curr.points,
    0
  );

  useEffect(function () {
    fetch('http://localhost:3000/questions')
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: 'dataReceived', payload: { question: data } })
      )
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPoints,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

function useQuiz(): any {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('Context was read outside the provider scoope');

  return context;
}

export { QuizProvider, useQuiz };

// {
//   questions: question[];
//   status: string;
//   index?: number;
//   answer?: number;
//   points?: number;
//   highscore?: number;
//   secondsRemaining?: number;
//   numQuestions?: number;
//   maxPoints?: number;
//   dispatch?: (action: { type: string }) => void;
// }
