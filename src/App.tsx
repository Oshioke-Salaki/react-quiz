import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './Header';
import MainSec from './MainSec';
import Loader from './Loader';
import ErrorComp from './ErrorComp';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishedScreen from './FinishedScreen';
import Timer from './Timer';
import Footer from './Footer';

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
        secondsRemaining: state.questions.length * 30,
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

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPoints: number = questions.reduce(
    (acc: number, curr: question) => acc + curr.points,
    0
  );

  useEffect(function () {
    fetch('http://localhost:3000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <MainSec>
        <>
          {status === 'loading' && <Loader />}
          {status === 'error' && <ErrorComp />}
          {status === 'ready' && (
            <StartScreen dispatch={dispatch} length={questions!.length} />
          )}
          {status === 'active' && (
            <>
              <Progress
                index={index}
                numQuestions={questions.length}
                points={points}
                maxPoints={maxPoints}
                answer={answer}
              />
              <Question
                dispatch={dispatch}
                curQuestion={questions![index]}
                answer={answer}
              />
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={secondsRemaining}
                />
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  numQuestions={questions.length}
                  index={index}
                />
              </Footer>
            </>
          )}
          {status === 'finished' && (
            <FinishedScreen
              points={points}
              maxPoints={maxPoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          )}
        </>
      </MainSec>
    </div>
  );
}

export default App;
