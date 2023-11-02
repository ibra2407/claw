import React, { useRef, useState, useEffect } from 'react';
import './Animation.css';
import DialogBox from './DialogBox';

export const Animation = () => {
  const containerRef = useRef(null);
  const [clawPosition, setClawPosition] = useState({ x: 0, y: 0 });
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isMovingDown, setIsMovingDown] = useState(false); // State to track downward movement
  const [retries, setRetries] = useState(2); // State to track the number of retries

  // setting initial position of green boxes
  const greenBoxes = [
    { x: 1, y: 9 },
    { x: 3, y: 9 },
    { x: 5, y: 9 },
    { x: 7, y: 9 },
    { x: 9, y: 9 },
    { x: 11, y: 9 },
    { x: 13, y: 9 },
    { x: 15, y: 9 },
    { x: 17, y: 9 },
    { x: 19, y: 9 },
    { x: 21, y: 9 },
  ];
  
  // meant to be 30px, change to dynamic 
  const clawVisualSize = 30;
  const gridSize = {
    width: 26,
    height: 10,
  };

  // meant to be 1 cell; irregular measurement. settle styling later
  const clawSize = {
    width: 1,
    height: 1,
  };

  // Effect to handle claw movement
  useEffect(() => {
    const moveDownInterval = setInterval(() => {
      if (isMovingDown && clawPosition.y < 9) {
        // Move down until y = 8 (one block above the bottom of the grid)
        setClawPosition((prevPosition) => ({
          ...prevPosition,
          y: prevPosition.y + 1,
        }));
      } else {
        setIsMovingDown(false); // Stop moving down
        clearInterval(moveDownInterval); // Clear the interval
      }
    }, 100); // Adjust the interval for smoother animation (in milliseconds)

    return () => {
      clearInterval(moveDownInterval); // Clean up the interval on component unmount
    };
  }, [isMovingDown, clawPosition]);

  // listens to keyboard input
  const handleKeyDown = (e) => {
    const { keyCode } = e;
    const newPosition = { ...clawPosition };

    // Move the claw based on the arrow key pressed
    if (keyCode === 37 && newPosition.x > 0) {
      // Left Arrow: Move the claw left; key 37
      newPosition.x -= 1;
    } else if (keyCode === 39 && newPosition.x < gridSize.width - clawSize.width) {
      // Right Arrow: Move the claw right; key 39
      newPosition.x += 1;
    } else if (keyCode === 40 && newPosition.y < gridSize.height - clawSize.height) {
      // Up Arrow: Move the claw up; key 40
      newPosition.y += 1;
    } else if (keyCode === 38 && newPosition.y > 0) {
      // Down Arrow: Move the claw down; key 38
      newPosition.y -= 1;
    } else if (keyCode === 32 && !isMovingDown && clawPosition.y < 8) {
      // Spacebar (keyCode 32) pressed and not already moving down and not at the bottom
      setIsMovingDown(true); // Set the state to start moving down
    }

    // Check if the new position overlaps with any green box
    const isOverlap = greenBoxes.some((box) => {
      return (
        newPosition.x < box.x + 1 && // Adjust the width to account for gaps
        newPosition.x + clawSize.width > box.x &&
        newPosition.y < box.y + 1 && // Adjust the height to account for gaps
        newPosition.y + clawSize.height > box.y
      );
    });

    if (isOverlap) {
      console.log("Claw hit a green box.");
      setGameCompleted(true);
    }
    setClawPosition(newPosition);

    // Print the coordinates of the updated claw position
    console.log(`Current Claw Position: x=${newPosition.x}, y=${newPosition.y}`);
  };

  // remove keyboard input when dialog is up
  useEffect(() => {
    if(!gameCompleted){
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [clawPosition, gameCompleted]);

  // manual styling of claw
  const clawStyle = {
    left: `${clawPosition.x * clawVisualSize}px`,
    top: `${clawPosition.y * clawVisualSize}px`,
    width: `${clawSize.width * clawVisualSize}px`,
    height: `${clawSize.height * clawVisualSize}px`,
    backgroundColor: 'red',
  };

  // renders the white colour grid
  const renderGrid = () => {
    const rows = [];
    for (let i = 0; i < gridSize.height; i++) {
      const cells = [];
      for (let j = 0; j < gridSize.width; j++) {
        const isGreenBox = greenBoxes.some((box) => box.x === j && box.y === i);
        const cellClass = isGreenBox ? 'grid-cell green-box' : 'grid-cell';
        cells.push(<div key={j} className={cellClass} />);
      }
      rows.push(<div key={i} className="grid-row">{cells}</div>);
    }
    return rows;
  };

  // logic for retrying
  const handleRetryClick = () => {
    setGameCompleted(false); // Reset game completion status
    setClawPosition({ x: 0, y: 0 }); // Reset claw position to (0, 0)
    setRetries(retries - 1); // Decrement the number of retries
  };

  return (
    <div className="game-container" ref={containerRef}>
      {renderGrid()}
      <div className="claw" style={clawStyle}></div>
      {gameCompleted && <DialogBox message="Your Superhero is..." onRetryClick={handleRetryClick} retries={retries}/>}
    </div>
  );
};

export default Animation;