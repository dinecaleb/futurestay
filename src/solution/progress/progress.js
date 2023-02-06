import ProgressBar from "../progress-bar/progress-bar";
import RequestButton from "../request-button/request-button";
import React from "react";
import "./progress.scss";

const Progress = ({ useBreakPoint, breakpoints, title }) => {
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const maxProgress = 20;
  let startInterval = React.useRef();

  ///with more time - i will probably move the intervals and parts of this function into the progress bar component
  const startRequest = () => {
    setLoading(true);
    setProgress(0); ///clear previous progress

    const timer = 1000;

    startInterval.current = setInterval(() => {
      ///put a wait here based on breakpoint to slowdown animation
      setProgress((oldProgress) => {
        let newProgress;
        if (useBreakPoint) {
            const percentage = (oldProgress + 1)*5;
            const breakpoint = breakpoints.includes(percentage);
            const usedBreakpoint = oldProgress % 1 !== 0;
    
              newProgress = breakpoint
                ? oldProgress + 0.1
                : usedBreakpoint && !breakpoint
                ? oldProgress + 1.9
                : oldProgress + 1;
                //logic here to create jumps and catch up to complete at the same time
        } else {
          
          newProgress = oldProgress + 1;
        }

        return newProgress;
      });
    }, timer);

    ///end progress after 15 secs
    setTimeout(() => {
      clearInterval(startInterval.current);
    }, 15000);
  };

  const endRequest = () => {
    // 20 is the max as i am using 100%; 15 === 90%
    setProgress(maxProgress);
    clearInterval(startInterval.current);

    let removeTimeout = setTimeout(() => {
      setLoading(false);
      clearTimeout(removeTimeout);
    }, 3500); ///400ms buffer to reset values
  };

  return (
    <div className="progress">
      <div>
        <h2>{title}{breakpoints? `- [${breakpoints.toString()}]`:""}</h2>
      </div>
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

export default Progress;
