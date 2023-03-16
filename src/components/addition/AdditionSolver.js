import React, { useContext } from "react";
import Guide from "./Guide";
import { AdditionSolverContext } from "../../state/AdditionSolverContext";

function AdditionSolver() {
  const {
    number1,
    number2,
    answer,
    isCorrect,
    showGuide,
    handleAnswerChange,
    handleKeyDownAnswer,
    handleCheckAnswer,
    handleCheckAnswerGuided,
    steps,
    stepNumber
  } = useContext(AdditionSolverContext);

  const handleCheckButton = () => {
    if (!showGuide) {
      handleCheckAnswer();
    } else {
      handleCheckAnswerGuided();
    }
  };

  return (
    <div>
      <div className="middle-wrapper">
        <Guide handleCheckButton={handleCheckButton} />

        <div className={`problem-con ${!showGuide ? "active" : "inactive"}`}>
          <div className="problem-numbers">
            <div className="left-con">
              <div className="top">
                <span className="operator add">+</span>

                <div className="digits-con">
                  <p className="number num1">{number1}</p>
                  <p className="number num2">{number2}</p>
                  <div className="divider" />
                </div>
              </div>
            </div>
            <div className="bottom">
              <input
                className="answer-input number"
                type="text"
                value={answer}
                onChange={handleAnswerChange}
                onKeyDown={handleKeyDownAnswer}
              />
            </div>
          </div>

          {isCorrect === true && <p>Correct!</p>}
          {isCorrect === false && <p>Incorrect!</p>}
          {isCorrect === false && (
            <div>
              <p>
                The correct answer is{" "}
                <span className="number">{number1 + number2}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="Footer">
        <button
          onClick={() => handleCheckButton()}
          disabled={stepNumber === steps.length || !answer ? true : false}
        >
          CHECK
        </button>
      </div>
    </div>
  );
}

export default AdditionSolver;
