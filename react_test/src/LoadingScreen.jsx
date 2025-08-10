import './LoadingScreen.css';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <span className="dot-loader">
        <span>.</span><span>.</span><span>.</span>
      </span>
      <p>Checking auth</p>
    </div>
  );
}

export default LoadingScreen;
