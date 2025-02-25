import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [advice, setAdvice] = useState("Click the button to get new advice.");

  async function fetchAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    return data.slip.advice;
  }

  const updateAdvice = async () => {
    console.log("Updating advice...");
    const newAdvice = await fetchAdvice();
    setAdvice(newAdvice);
    console.log("Advice updated:", newAdvice);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", width: "100vw" }}>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body text-center">
          <h5 className="card-title">Advice</h5>
          <p className="card-text">{advice}</p>
          <button className="btn btn-primary" onClick={updateAdvice}>Get Advice</button>
        </div>
      </div>
    </div>
  );
};

export default App;
