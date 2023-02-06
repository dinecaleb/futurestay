import "./solution.scss";
import React from "react";
import Progress from "./progress/progress";

const Solution = () => {
  
  return (
    //this can be implemented differently but i choose to do this for simplicity
    <div className="solution">
     <Progress title={"Progress Bar"}/>
     <Progress title={"Progress Bar with Breakpoint"} useBreakPoint={true} breakpoints={[10,30,60]}/>
    </div>
  );
};

export default Solution;
