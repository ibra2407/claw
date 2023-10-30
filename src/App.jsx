import React from "react";
import Game from "./components/Game";
import "./styles.css";

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const uniqueID = searchParams.get("id");

  if (!uniqueID) {
    // Unique ID parameter is not present in the URL
    return (
      <div className="App">
        <h1 className="centered-heading">Here for GivingHeroes2024? <br></br> <br></br> Please get a unique ID from SKH DO!</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="centered-heading">GivingHeroes 2024</h1>
      <hr />
      <Game />
    </div>
  );
}

export default App;
