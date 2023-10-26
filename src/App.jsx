import React from "react";
import Game from "./components/Game";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1 className="centered-heading">GivingHeroes 2024</h1>
      <hr>
      </hr>
      <Game />
    </div>
  );
}

// only pass in uID and fig
// create a usestate to keep track of completion (now done on backend side; matching)
// when completed
// use params to pass value from parent to child

export default App;
