import React from "react";
import "/src/Components/QuizPage/QuizPage.css";
import { nanoid } from "nanoid";
import QuestionSection from "../QuestionSection/QuestionSection";

const QuizPage = (props) => {
  const [quizData, setQuizData] = React.useState([]);
  const [showAnswers, setShowAnswers] = React.useState(false);
  const [showSubmit, setShowSubmit] = React.useState(false);
  const handleSelectOption = (id, selectedAnswer) => {
    if (!showAnswers) {
      setQuizData((prevQuizData) => {
        return prevQuizData.map((item) => {
          return id === item.id
            ? { ...item, selectedAnswer: selectedAnswer }
            : item;
        });
      });
    }
  };
  const handleCheckAnswers = () => {
    if (showSubmit) {
      setShowSubmit(false);
      setShowAnswers(true);
    }
  };
  const backToLanding = () => {
    props.backToLanding();
  };
  const quiizElemets =
    quizData && quizData.length > 0
      ? quizData.map((item) => {
          const options = [...item.incorrect_answers, item.correct_answer];
          const question = item.question;
          return (
            <QuestionSection
              options={options}
              question={question}
              id={item.id}
              key={item.id}
              selectedAnswer={item.selectedAnswer}
              showAnswers={showAnswers}
              correctAnswer={item.correct_answer}
              handleSelectOption={(id, selectedAnswer) => {
                handleSelectOption(id, selectedAnswer);
              }}
            />
          );
        })
      : [];
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&encode=base64")
      .then((res) => res.json())
      .then((data) => {
        if (data.response_code === 0) {
          let results = data.results.map((item) => {
            return {
              ...item,
              selectedAnswer: "",
              id: nanoid(),
              correct_answer: window.atob(item.correct_answer),
              question: window.atob(item.question),
              incorrect_answers: item.incorrect_answers.map(
                (eachInCorrectAns) => window.atob(eachInCorrectAns)
              ),
            };
          });
          setQuizData(results);
        }
      });
  }, []);
  React.useEffect(() => {
    let showSubmitBtn = quizData && quizData.length > 0 ? true : false;
    quizData.forEach((item) => {
      if (item.selectedAnswer === "") {
        showSubmitBtn = false;
        return;
      }
    });
    setShowSubmit(showSubmitBtn);
  }, [quizData]);
  return (
    <div className="quizPage">
      {quiizElemets}
      {!showAnswers && quizData && quizData.length > 0 && (
        <div className="quizPage--submitBtnContainer">
          <div
            className={`quizPage--submitBtn${
              !showSubmit ? " disabledBtn" : ""
            }`}
            onClick={handleCheckAnswers}
          >
            Check Answers
          </div>
        </div>
      )}
      {showAnswers && (
        <section className="scoreResultText">
          You Scored{" "}
          {
            quizData.filter(
              (item) => item.selectedAnswer === item.correct_answer
            ).length
          }
          /{quizData.length} correct answers
          <div className="quizPage--playAgainBtn" onClick={backToLanding}>
            Play Again
          </div>
        </section>
      )}
    </div>
  );
};

export default QuizPage;
