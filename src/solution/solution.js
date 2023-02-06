import ProgressBar from "./progress-bar/progress-bar";
import "./solution.scss";
import RequestButton from "./request-button/request-button";
import React from "react";

const Solution = () => {
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [complete, setComplete] = React.useState(false);
  const MAX_PROGRESS = 20;
  let startInterval = React.useRef();

  const startRequest = React.useCallback(() => {
    setLoading(true);
    setProgress(0);
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
    setProgress(MAX_PROGRESS);
    setComplete(true);
    clearInterval(startInterval.current);

    let removeTimeout = setTimeout(() => {
      resetProgress();
      clearTimeout(removeTimeout);
    }, 3500); ///400ms buffer to reset values
  }, []);

  const resetProgress = () => {
    setLoading(false);
    setComplete(false);
  };

  return (
    <div className="solution">
      {loading && <ProgressBar value={progress} complete={complete} />}
      <RequestButton type="start" onClick={startRequest} loading={loading} />
      {loading && <RequestButton type="finish" onClick={endRequest} />}
    </div>
  );
};

export default Solution;
