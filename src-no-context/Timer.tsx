import { useEffect } from 'react';

const Timer: React.FC<{
  dispatch: (action: { type: string }) => void;
  secondsRemaining: number;
}> = ({ dispatch, secondsRemaining }) => {
  const mins: number = Math.floor(secondsRemaining / 60);
  const seconds: number = secondsRemaining % 60;
  useEffect(() => {
    const id = setInterval(function () {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 && '0'}
      {mins}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
};

export default Timer;
