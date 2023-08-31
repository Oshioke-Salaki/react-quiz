const StartScreen: React.FC<{
  dispatch: (action: { type: string }) => void;
  length: number;
}> = (props) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{props.length} questions to test your React mastery</h3>
      <button
        onClick={() => props.dispatch({ type: 'start' })}
        className="btn btn-ui"
      >
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
