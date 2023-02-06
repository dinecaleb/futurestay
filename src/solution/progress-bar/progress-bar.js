import "./progress-bar.scss";
import React from "react";

const ProgressBar = ({ value,complete }) => {
    
  return (
    <div className="progressBar">
      <div
        className={`bar ${complete ? "fade-away" : ""}`}
        style={{ width: `${value * 5}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
