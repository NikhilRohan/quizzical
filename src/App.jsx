import React from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import QuizPage from "./Components/QuizPage/QuizPage";

function App() {
  const [isLandingPage, setIsLandingPage] = React.useState(true);
  const toggleIsLandingPage = (value) => {
    setIsLandingPage(value);
  };
  const backToLanding = () => {
    setIsLandingPage(true);
  };
  return (
    <div className="App">
      {isLandingPage ? (
        <LandingPage
          toggleIsLandingPage={() => {
            toggleIsLandingPage(false);
          }}
        />
      ) : (
        <QuizPage backToLanding={backToLanding} />
      )}
    </div>
  );
}

export default App;
