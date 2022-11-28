import "/src/Components/QuestionSection/QuestionSection.css";
import React from "react";

const QuestionSection = (props) => {
  const optionElements = props.options.map((option) => {
    return (
      <div
        className={`optionClass${
          props.showAnswers === false && props.selectedAnswer === option
            ? " selectedAnswer"
            : ""
        }${
          props.showAnswers === true && props.correctAnswer === option
            ? " correctAnswer"
            : ""
        }${
          props.showAnswers === true &&
          props.correctAnswer !== option &&
          props.selectedAnswer === option
            ? " wrongAnswer"
            : ""
        }`}
        key={option}
        onClick={() => {
          props.handleSelectOption(props.id, option);
        }}
      >
        {option}
      </div>
    );
  });
  return (
    <div className="quizPage--section">
      <div className="quizPage--section--question">{props.question}</div>
      <div className="quizPage--section--options">{optionElements}</div>
      <hr />
    </div>
  );
};

export default QuestionSection;
