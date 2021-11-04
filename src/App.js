import { useState, useRef } from "react";

import "./App.scss";
import { EndGame } from "./EndGame";

import { Scramble } from "./Scramble";

function App() {
  const idQuestion = useRef(0);

  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  const [finalScore, setFinalScore] = useState(0);

  const handleNext = () => {
    idQuestion.current = idQuestion.current + 1;

    setCount(count + 1);
  };

  const listQuestion = useRef([
    "ốcvít",
    "quaycóp",
    "nhảyđầm",
    "lybia",
    "tươngbần",
    "cákho",
    "càphê",
    "tựtin",
    "vượtbậc",
    "chuacay",
  ]);

  const [shuffleListQuestion, setShuffleListQuestion] = useState(() => {
    const arrayShuffleList = [];
    for (let i in listQuestion.current) {
      arrayShuffleList.push(listQuestion.current[i].split(""));
    }
    const newArrayShuffle = [];
    for (let i in listQuestion.current) {
      newArrayShuffle.push(listQuestion.current[i].split(""));
    }

    for (let i in newArrayShuffle) {
      do {
        shuffleArr(newArrayShuffle[i]);
      } while (newArrayShuffle[i].join("") === arrayShuffleList[i].join(""));
    }

    return newArrayShuffle.map((item) => item.join(""));
  });
  function shuffleArr(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var rand = Math.floor(Math.random() * (i + 1));
      [array[i], array[rand]] = [array[rand], array[i]];
    }
  }

  const lengthQuestion = listQuestion.current.length;

  const handleEnd = (score) => {
    setFinalScore(score);
    setShow(!show);
  };

  const listShowAnswer = listQuestion.current.map((item) => {
    return item
      .split("")
      .map(() => "_")
      .join("");
  });
  const question = listQuestion.current[idQuestion.current];
  const shuffleQuestion = shuffleListQuestion[idQuestion.current];
  const showAnswer = listShowAnswer[idQuestion.current];

  return (
    <div>
      {
        <audio autoPlay style={{ display: "none" }}>
          <source src="./windyhill.mp3" type="audio/mpeg"></source>
        </audio>
      }
      {show && (
        <Scramble
          question={shuffleQuestion}
          shuffleQuestion={question}
          showAnswer={showAnswer}
          handleNext={handleNext}
          handleEnd={handleEnd}
          lengthQuestion={lengthQuestion}
        ></Scramble>
      )}
      {!show && (
        <EndGame
          finalScore={finalScore}
          lengthQuesion={lengthQuestion}
        ></EndGame>
      )}
    </div>
  );
}

export default App;
