import ProgressBar from "./progress-bar/progress-bar";
import "./solution.scss";
import RequestButton from "./request-button/request-button";
import React from "react";

const Solution = () => {
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [complete, setComplete] = React.useState(false);

  let startInterval = React.useRef();

  const startRequest = React.useCallback(() => {
    setLoading(true);

    startInterval.current = setInterval(() => {
      setProgress((oldProgress) => oldProgress + 1);
    }, 1000);

    ///end progress after 15 secs
    setTimeout(() => {
      clearInterval(startInterval.current);
    }, 15000);
  }, []);

  const endRequest = React.useCallback(() => {
    // 20 is the max as i am using 100%; 15 === 90%
    setProgress(20);
    setComplete(true);
    clearInterval(startInterval.current);

    let removeTimeout = setTimeout(() => {
      resetProgress();
      clearTimeout(removeTimeout);
    }, 4000); ///100ms buffer to reset values
  }, []);

  const resetProgress = () => {
    setLoading(false);
    setProgress(0);
    setComplete(false);
  };

  return (
    <div className="solution">
      {loading && <ProgressBar value={progress} complete={complete} />}
      {loading && <RequestButton type="finish" onClick={endRequest} />}
      <RequestButton type="start" onClick={startRequest} loading={loading} />
    </div>
  );
};

export default Solution;
