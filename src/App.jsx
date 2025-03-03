import React, { useState } from "react";
import DiceIcon from "./assets/images/icon-dice.svg";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [advice, setAdvice] = useState("Click the button to get new advice.");// the start up text w/ setAdvice for the output
  const [id, setId] = useState(0);// the start up id w/ setId for the output
  const [isLoading, setIsLoading] = useState(false);


  async function fetchAdvice() {// simple fetch function to get the advice from the api
    const response = await fetch("https://api.adviceslip.com/advice");
    try {
      const data = await response.json();
      return data;
    }
    catch (error) {
      console.log("Error:", error);
    }
  }

  const updateAdvice = async () => {
    if (isLoading) return; // Prevent multiple clicks
  
    setIsLoading(true);
    console.log("Waiting before fetching new advice...");
  
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
  
    const { slip } = await fetchAdvice();
    setId(slip.id);
    setAdvice(slip.advice);
    console.log("Updated advice:", slip.advice);
  
    setIsLoading(false);
  };
  



  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "100vh", width: "100vw", backgroundColor: "#121212" }}
    >
      <div
        className="card text-light text-center border-0 shadow-lg p-4 p-md-3"
        style={{
          maxWidth: "90%",
          width: "24rem",
          borderRadius: "15px",
          backgroundColor: "#1c1f2a",
          position: "relative", // Important for positioning the button relative to the card
        }}
      >
        <div className="card-body">
          <h6
            className="text-uppercase fw-bold mb-3"
            style={{
              color: "#07dd05",
              letterSpacing: "2px",
              fontSize: "14px",
            }}
          >
            Advice #{id}
          </h6>
          <p className="card-text fw-semibold fs-6 fs-md-5" style={{ lineHeight: "1.6" }}>
            "{advice}"
          </p>
          <hr className="my-3 border-light opacity-25" style={{ width: "80%", margin: "auto" }} />
        </div>

        <button
          className="btn d-flex justify-content-center align-items-center shadow-lg position-absolute"
          style={{
            backgroundColor: "#07dd05",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "none",
            transition: "0.3s",
            bottom: "-25px", // Pulls the button below the card
            left: "50%",
            transform: "translateX(-50%)", // Centers the button horizontally
          }}
          onClick={updateAdvice}
          onMouseOver={(e) => (e.target.style.boxShadow = "0 0 15px #9cff94")}
          onMouseOut={(e) => (e.target.style.boxShadow = "none")}
        >
          <img src={DiceIcon} alt="Dice Icon" width="28" />
        </button>
      </div>
    </div>





  );
};

export default App;
