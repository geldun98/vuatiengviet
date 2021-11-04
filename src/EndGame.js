import React from "react";
import "./App.scss";
export const EndGame = ({ finalScore, lengthQuesion }) => {
  return (
    <div className="EndGame">
      <div className="resultUser">
        <i className="fas fa-trophy"></i>
        <span>
          {finalScore}/{lengthQuesion}
        </span>
      </div>
      <div className="Comment">Thanks for your attention</div>
    </div>
  );
};
