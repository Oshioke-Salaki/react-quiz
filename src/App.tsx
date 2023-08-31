// import { useEffect } from 'react';
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
import { useQuiz } from './context/QuizContext';

function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <MainSec>
        <>
          {status === 'loading' && <Loader />}
          {status === 'error' && <ErrorComp />}
          {status === 'ready' && <StartScreen />}
          {status === 'active' && (
            <>
              <Progress />
              <Question />
              <Footer>
                <Timer />
                <NextButton />
              </Footer>
            </>
          )}
          {status === 'finished' && <FinishedScreen />}
        </>
      </MainSec>
    </div>
  );
}

export default App;
