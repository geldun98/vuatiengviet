import React from "react";
import { useState, useRef, useEffect } from "react";

import "./App.scss";
export const Scramble = ({
  question,
  shuffleQuestion,
  showAnswer,
  handleNext,
  handleEnd,
  lengthQuestion,
}) => {
  const [arrayQuestion, setArrayQuestion] = useState(question.split(""));
  const [arrayAnswer, setArraryAnswer] = useState(showAnswer.split(""));
  const oldQuestion = useRef(shuffleQuestion);
  const [count, setCount] = useState(0);
  const checkIcon = useRef(false);
  const onlyOne = useRef(false);
  const [countDown, setCountDown] = useState(30);
  const countTime = useRef(30);

  const score = useRef(0);
  const fixID = useRef(0);
  const timer = useRef();

  const handleQuestion = (e) => {
    for (let i in arrayAnswer) {
      if (arrayAnswer[i] === "_") {
        arrayAnswer[i] = e.target.innerText;

        break;
      }
    }

    e.target.innerText = "_";

    setCount(count + 1);
  };

  const handleAnswer = (e) => {
    const buttonQuestion = document.querySelectorAll(".btnQuestion");

    for (let i in arrayQuestion) {
      if (
        question.split("")[i] === e.target.innerText &&
        buttonQuestion[i].innerText === "_"
      ) {
        buttonQuestion[i].innerText = e.target.innerText;

        break;
      }
    }
    e.target.innerText = "_";
    arrayAnswer[e.target.id] = "_";
    setCount(count + 1);
  };
  const handleCheck = () => {
    clearInterval(timer.current);
    setCountDown(30);

    const checkResult = arrayAnswer.join("") === shuffleQuestion;

    if (checkResult === true) {
      score.current = score.current + 1;
      checkIcon.current = true;
    } else {
      checkIcon.current = false;
    }
    document.querySelector(".showResult").classList.remove("isActive");
    if (fixID.current < lengthQuestion - 1) {
      fixID.current = fixID.current + 1;

      handleNext();
    } else {
      document.querySelector(".showResult").classList.remove("isActive");

      onlyOne.current = true;
    }
  };
  const handleNextQuestion = () => {
    oldQuestion.current = shuffleQuestion;
    if (onlyOne.current) {
      handleEnd(score.current);
      return;
    }
    countTime.current = 30;
    timer.current = setInterval(() => {
      if (countTime.current < 1) {
        score.current = score.current - 1;
        setCount(count + 1);
        clearInterval(timer.current);

        return;
      } else {
        countTime.current = countTime.current - 1;

        setCountDown(countTime.current);
      }
    }, 1000);
    document.querySelector(".showResult").classList.add("isActive");

    setArrayQuestion(question.split(""));
    setArraryAnswer(showAnswer.split(""));
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      if (countTime.current < 1) {
        score.current = score.current - 1;

        clearInterval(timer.current);

        return;
      } else {
        countTime.current = countTime.current - 1;

        setCountDown(countTime.current);
      }
    }, 1000);
  }, []);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="App">
      <div className="Infor">
        <span className="Score">
          <span>Score:</span> {score.current}
        </span>
        <span className="Time">{countDown}</span>
      </div>
      <div className="Answer">
        {arrayAnswer.map((item, id) => {
          let keyID = `${fixID.current}-${id}`;

          return (
            <button
              key={keyID}
              id={id}
              className="btnAnswer"
              onClick={handleAnswer}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="Question">
        {arrayQuestion.map((item, id) => {
          let keyID = `${fixID.current}-${id}`;
          return (
            <button
              key={keyID}
              className="btnQuestion"
              onClick={handleQuestion}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="Check">
        {
          <button className="btnCheck" onClick={handleCheck}>
            Check
          </button>
        }
      </div>
      <div className="showResult isActive">
        {checkIcon.current && (
          <div className="showIconTrue ">
            <i className="far fa-smile"></i>
            <i className="far fa-smile"></i>
            <i className="far fa-smile"></i>
          </div>
        )}
        {!checkIcon.current && (
          <div className="showIconFalse ">
            <i className="far fa-sad-cry"></i>
            <i className="far fa-sad-cry"></i>
            <i className="far fa-sad-cry"></i>
          </div>
        )}
        <div className="showAnswer">
          <span>Answer:</span>
          {oldQuestion.current}
        </div>
        <button className="btnNext" onClick={handleNextQuestion}>
          Continue
        </button>
      </div>
    </div>
  );
};
