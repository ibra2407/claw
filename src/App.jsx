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
        <h1 className="centered-heading large-text"> Here for GivingHeroes 2024?<br></br> Please get a unique ID from SKH DO!</h1>
      </div>
    );
  }

  const isDonated = localStorage.getItem(`UniqueID ${uniqueID}`);

  if (isDonated) {
    // Unique ID is present in local storage, indicating donation has been made
    return (
      <div className="App">
        <h1 className="centered-heading large-text"> This token has been used! <br></br> Thanks for donating, Hero!</h1>
      </div>
    );
  }

  // Unique ID is present in the URL but not in local storage, render the game
  return (
    <div className="App">
      <h1 className="centered-heading large-text">Giving Heroes</h1>
      <Game />
    </div>
  );
}

export default App;
