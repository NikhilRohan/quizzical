import React from "react";
import "/src/Components/LandingPage/Landing.css";

const LandingPage = (props) => {
  return (
    <div className="landingPage">
      <span className="landingPage--title">Quizzical</span>
      <div className="landingPage--btn" onClick={props.toggleIsLandingPage}>
        Start Quiz
      </div>
    </div>
  );
};

export default LandingPage;
