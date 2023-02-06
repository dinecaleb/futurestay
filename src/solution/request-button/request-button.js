import "./request-button.scss";
import React from "react";

const RequestButton = ({ onClick, loading, type }) => {
  let buttonInitalClass = "request upcase large medium ";
  const buttonClass =
    type === "start"
      ? `${buttonInitalClass} start`
      : `${buttonInitalClass} finish`;
  const buttonText = loading
    ? "Loading..."
    : type === "start"
    ? "start request"
    : "finish request";
  return (
    <button disabled={loading} onClick={onClick} className={buttonClass}>
      {buttonText}
    </button>
  );
};

export default React.memo(RequestButton);
