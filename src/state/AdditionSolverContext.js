import React, { createContext, useState, useEffect } from "react";

export const AdditionSolverContext = createContext();

export const AdditionSolverProvider = ({ children }) => {
  const [number1, setNumber1] = useState(914);
  const [number2, setNumber2] = useState(89);
  const [answer, setAnswer] = useState("");
  const [guidedAnswers, setGuidedAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [result, setResult] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [steps, setSteps] = useState([]);
  const [guidedResult, setGuidedResult] = useState("");
  const [sliceStart, setSliceStart] = useState(0);
  const [activeDigitIndex, setActiveDigitIndex] = useState(-1);
  const [carryArr, setCarryArr] = useState([]);
  const [revealAnswer, setRevealAnswer] = useState(false);

  useEffect(() => {
    if (showGuide) {
      resetStates();
    }
  }, [showGuide]);

  const resetStates = () => {
    solve();
    setStepNumber(0);
    setSliceStart(0);
    setActiveDigitIndex(-1);
    setRevealAnswer(false);
  };

  const solve = () => {
    let carry = 0;
    let tempResult = "";
    let tempSteps = [];
    let tempAnswers = [];
    let tempCarryArr = [0];

    // Convert numbers to strings and pad with leading zeros if necessary
    const string1 = number1.toString().padStart(3, "0");
    const string2 = number2.toString().padStart(3, "0");

    // Start from rightmost digits and move towards leftmost digits
    for (let i = string1.length - 1; i >= 0; i--) {
      // Add digits from both numbers and carry
      let sum = parseInt(string1[i]) + parseInt(string2[i]) + carry;
      tempAnswers.push(sum);
      // Check if a carry is generated
      if (sum >= 10) {
        carry = 1;
        sum -= 10;
      } else {
        carry = 0;
      }

      tempSteps.push(
        `Add ${string1[i]} and ${string2[i]} with a carry of ${carry}.`
      );
      tempCarryArr.push(carry); // carry to be displayed above digits

      // Add the current digit to the result and steps
      tempResult = sum.toString() + tempResult;
    }
    // If there is a carry left after adding all digits, add it to the result and steps
    if (carry > 0) {
      tempResult = carry.toString() + tempResult;
      tempSteps.push(`Add a carry of ${carry} to the leftmost digit.`);
      tempAnswers.push(carry);
    }

    setResult(tempResult);
    setSteps(tempSteps);
    setStepNumber(0);
    setGuidedAnswers(tempAnswers);
    setCarryArr(tempCarryArr.reverse());
  };
  const handlePrev = () => {
    if (stepNumber > 0) {
      setStepNumber(stepNumber - 1);
      setSliceStart(sliceStart + 1);
      setActiveDigitIndex(activeDigitIndex + 1);
      setRevealAnswer(false);
    }
  };

  const handleNext = () => {
    if (stepNumber < steps.length) {
      setStepNumber(stepNumber + 1);
      setSliceStart(sliceStart - 1);
      setActiveDigitIndex(activeDigitIndex - 1);
    }
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
    setIsCorrect(null);
  };

  // check input in standard mode
  const handleCheckAnswer = () => {
    const correctAnswer = parseInt(number1) + parseInt(number2);
    const userAnswer = parseInt(answer);

    if (userAnswer === correctAnswer) {
      setIsCorrect(true);
      getNewNumbers();
      setAnswer("");
    } else {
      setIsCorrect(false);
    }
    setTimeout(() => {
      setIsCorrect(null);
    }, 2000);
  };

  // check input in guided mode
  const handleCheckAnswerGuided = () => {
    if (stepNumber === steps.length) return;

    if (guidedAnswers[stepNumber].toString() === answer) {
      // show feedback
      console.log("correct");
      setAnswer("");
      handleNext();
    } else {
      // show feedback
      console.log("incorrect!");
    }
  };

  // handle enter button for input
  const handleKeyDownAnswer = (event) => {
    if (event.key === "Enter") {
      handleCheckAnswer();
    }
  };

  const getNewNumbers = () => {
    setNumber1(Math.floor(Math.random() * 1000));
    setNumber2(Math.floor(Math.random() * 1000));
  };

  return (
    <AdditionSolverContext.Provider
      value={{
        number1,
        setNumber1,
        number2,
        setNumber2,
        answer,
        setAnswer,
        handleKeyDownAnswer,
        isCorrect,
        setIsCorrect,
        result,
        setResult,
        showGuide,
        setShowGuide,
        handleAnswerChange,
        handleCheckAnswer,
        handleCheckAnswerGuided,
        getNewNumbers,
        stepNumber,
        setStepNumber,
        guidedAnswers,
        setGuidedAnswers,
        guidedResult,
        setGuidedResult,
        steps,
        handlePrev,
        handleNext,
        sliceStart,
        activeDigitIndex,
        carryArr,
        revealAnswer,
        setRevealAnswer
      }}
    >
      {children}
    </AdditionSolverContext.Provider>
  );
};
