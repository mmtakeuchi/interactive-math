import React, { useContext, useEffect } from "react";
import { AdditionSolverContext } from "../../state/AdditionSolverContext";

function Guide({ handleCheckButton }) {
  const {
    number1,
    number2,
    answer,
    showGuide,
    stepNumber,
    handleAnswerChange,
    handlePrev,
    steps,
    result,
    sliceStart,
    activeDigitIndex,
    carryArr,
    revealAnswer,
    setRevealAnswer
  } = useContext(AdditionSolverContext);

  //split numbers to highlight during active step
  const splitNum1 = number1.toString().split("");
  const splitNum2 = number2.toString().split("");
  const activeDigit1 = splitNum1.length + activeDigitIndex; //cycle through digits from right to left
  const activeDigit2 = splitNum2.length + activeDigitIndex; //cycle through digits from right to left
  const slicedArr = carryArr.slice(sliceStart - 1, carryArr.length);
  // const lastNum = steps.length - 1;

  useEffect(() => {
    if (activeDigit1 && activeDigit2 < 0) {
      setRevealAnswer(true);
    }
  }, [activeDigit1, activeDigit2]);

  const handleKeyDownAnswer = (e) => {
    if (e.key === "Enter" && answer) {
      handleCheckButton();
    }
  };

  console.log(answer)

  return (
    <div className={`guide-con ${showGuide ? "active" : "inactive"}`}>
      <div className="left-con">
        <div className="top">
          <span className="operator add">+</span>

          <div className="digits-con">
            {carryArr.map((d, i) => {
                return (
                <span
                // className={`number carry-con num-${d} ${(sliceStart - 1 + i === activeDigitIndex && d !== 0) ? 'fade-in' : ''} ${sliceStart - 1 + i === activeDigitIndex ? 'active' : 'inactive'}`}
                className={`number carry-con num-${d} ${(i - carryArr.length) === activeDigitIndex ? 'active fade-in' : 'inactive'} ${Math.abs(activeDigitIndex) <= carryArr.length - 1 - i || sliceStart - 1 + i === activeDigitIndex ? 'hidden' : ''}`}
                key={i}
              >
                {d}
              </span>
            )})}

            <div className="number num1">
              {splitNum1.map((digit, i) => (
                <span
                  key={i}
                  className={`${i === activeDigit1 && "active-digit"}`}
                >
                  {digit}
                </span>
              ))}
            </div>
            <p className="number num2">
              {splitNum2.map((digit, i) => (
                <span
                  key={i}
                  className={`${i === activeDigit2 && "active-digit"}`}
                >
                  {digit}
                </span>
              ))}
            </p>
            <div className="divider" />
          </div>
        </div>

        <div className="bottom">
          {/* input */}
          <div className="answer-con">
            {!revealAnswer && stepNumber < steps.length && (
              <input
                className="guide-input number"
                value={answer}
                onChange={handleAnswerChange}
                onKeyDown={handleKeyDownAnswer}
              />
            )}
            {revealAnswer ? (
              <p className="number answer">{result}</p>
            ) : (
              <p className="number answer">
                {stepNumber > 0 && result.slice(sliceStart, result.length)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={`right-con ${showGuide ? "animate__fadeInRight" : ""}`}>
        <p className="step">{steps[stepNumber]}</p>

        <div className="nav">
          <button onClick={handlePrev} disabled={stepNumber === 0}>
            back
          </button>
          {/* <button onClick={handleNext} disabled={stepNumber >= steps.length}>
						next
					</button> */}
        </div>
      </div>
    </div>
  );
}

export default Guide;
