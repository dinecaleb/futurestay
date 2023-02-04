import "./progress-bar.scss";
import React from "react";

const ProgressBar = ({ value,complete,breakpoints,max }) => {
  const percentage = value/max * 100;
  const useBreakPoint = breakpoints.includes(percentage);
  console.log(useBreakPoint,'22')

  const style ={
    width: `${percentage}%`
  }
  return (
    <div className="progressBar">
      <div
        className={`bar ${useBreakPoint? "slow-down":""} ${complete ? "fade-away" : ""}`}
        style={style}
      ></div>
    </div>
  );
};

export default ProgressBar;
