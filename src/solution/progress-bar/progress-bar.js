import "./progress-bar.scss";
import React from "react";

const ProgressBar = ({ value,max }) => {
  const percentage = value/max * 100;

  const style ={
    width: `${percentage}%`
  }
  return (
    <div className="progressBar">
      <div
        className={`bar ${percentage===100 ? "fade-away" : ""}`}
        style={style}
      ></div>
    </div>
  );
};

export default ProgressBar;
