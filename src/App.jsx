// App.jsx
import React, { useState } from 'react';
import Animation from './components/Animation.jsx';
import Tutorial from './components/Tutorial.jsx';
import './styles.css';

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const uniqueID = searchParams.get('id');
  const [showTutorial, setShowTutorial] = useState(false);
  const [enableSparkle, setEnableSparkle] = useState(true);

  if (!uniqueID) {
    // Unique ID parameter is not present in the URL
    return (
      <div className="overlay">
        <div>
          <h1 className="centered-heading large-text">
            Here for SKH GivingHeroes 2024?<br></br><br></br><br></br><br></br><br></br><br></br><br></br> Please get a unique ID from SKH DO!
          </h1>
        </div>
      </div>
    );
  }

  const isDonated = localStorage.getItem(`UniqueID ${uniqueID}`);

  if (isDonated) {
    // Unique ID is present in local storage, indicating donation has been made
    return (
      <div className="overlay">
        <div>
          <h1 className="centered-heading large-text">
            This token has been used! <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            Thanks for donating, Hero!
          </h1>
        </div>
      </div>
    );
  }

  const handleLeftButtonClick = () => {
    // Simulate left arrow key press
    const leftArrowKeyEvent = new KeyboardEvent('keydown', { keyCode: 37 });
    document.dispatchEvent(leftArrowKeyEvent);
  };

  const handleCatchButtonClick = () => {
    // Simulate spacebar press
    const spacebarKeyEvent = new KeyboardEvent('keydown', { keyCode: 32 });
    document.dispatchEvent(spacebarKeyEvent);
  };

  const handleRightButtonClick = () => {
    // Simulate right arrow key press
    const rightArrowKeyEvent = new KeyboardEvent('keydown', { keyCode: 39 });
    document.dispatchEvent(rightArrowKeyEvent);
  };

  // Unique ID is present in the URL but not in local storage, render the game and tutorial button
  return (
    <div className="App">
      <h1 className="centered-heading large-text">SKH Giving Heroes</h1>
      <div className="wrapper">
        <div>Move the claw and pick your lucky box!</div>
        <Animation />
      </div>

      <div className="control-buttons-container">
        <button className='control-button' onClick={handleLeftButtonClick} style={{ fontSize: '24px' }}>
          &larr;
        </button>

        <button className='control-button' onClick={handleCatchButtonClick}>
          Catch
        </button>

        <button className='control-button' onClick={handleRightButtonClick} style={{ fontSize: '24px' }}>
          &rarr;
        </button>

        {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      {/* Button to open the tutorial */}
      {uniqueID && !showTutorial && (
        <button
        className={`tutorial-button ${enableSparkle ? 'sparkle' : ''}`}
        onClick={() => {
          setShowTutorial(true);
          setEnableSparkle(false); // Disable sparkle animation after the first click
        }}
      >
        How To Play
        </button>
      )}
      </div>

    </div>
  );
}

export default App;
