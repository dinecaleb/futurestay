import ProgressBar from "./progress-bar/progress-bar";
import "./solution.scss";
import RequestButton from "./request-button/request-button";
import React from "react";

const Solution = () => {
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const breakpoints = [10, 40, 60];
  const maxProgress = 20;
  let startInterval = React.useRef();

  ///with more time - i will probably move the intervals and parts of this function into the progress bar component
  const startRequest = React.useCallback(() => {
    setLoading(true);
    setProgress(0); ///clear previous progress
    const timer = 1000 ;

    startInterval.current = setInterval(() => {
      ///put a wait here based on breakpoint to slowdown animation
      setProgress((oldProgress) =>  {
        const percentage = (oldProgress + 1)*5;
        const useBreakPoint = breakpoints.includes(percentage);
        const usedBreakpoint = oldProgress % 1 !== 0;

        const newProgress = useBreakPoint ? oldProgress + 0.3:usedBreakpoint && !useBreakPoint? oldProgress +1.7: oldProgress + 1

        return newProgress
      });
    }, timer);

    ///end progress after 15 secs
    setTimeout(() => {
      clearInterval(startInterval.current);
    }, 15000);
  }, []);

  const endRequest = React.useCallback(() => {
    // 20 is the max as i am using 100%; 15 === 90%
    setProgress(maxProgress);
    clearInterval(startInterval.current);

    let removeTimeout = setTimeout(() => {
        setLoading(false);
      clearTimeout(removeTimeout);
    }, 3500); ///400ms buffer to reset values
  }, []);

 

  return (
    <div className="solution">
      {loading && (
        <ProgressBar
          value={progress}
          breakpoints={breakpoints}
          max={maxProgress}
        />
      )}
      <RequestButton type="start" onClick={startRequest} loading={loading} />
      {loading && <RequestButton type="finish" onClick={endRequest} />}
    </div>
  );
};

export default Solution;
