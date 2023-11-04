import React, { useRef, useState, useEffect } from 'react';
import './Animation.css';
import DialogBox from './DialogBox';

export const Animation = () => {
  const containerRef = useRef(null);
  const [clawPosition, setClawPosition] = useState({ x: 0, y: 0 });
  const [gameCompleted, setGameCompleted] = useState(false);
  const [retries, setRetries] = useState(2); // State to track the number of retries
  const [isMoving, setIsMoving] = useState(false);

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

  const handleSpacebarPress = () => {
    if (!isMoving) {
      setIsMoving(true);

      // Set a timeout to check for overlap after the animation duration
      setTimeout(() => {
        setIsMoving(false);
        const overlappingBox = greenBoxes.find((box) => box.x === clawPosition.x && box.y === 9);

        // Check if the claw is at y=0 and overlaps with a green box
        if (overlappingBox) {
          console.log("Claw hit a green box.");
        }

        // can set end point to smth like when claw reach y=25 and then run anim to act like smth dropped
        // Set gameCompleted to true only after moveUp animation has finished

        setTimeout(() => {
          if (overlappingBox) {
            console.log("Claw hit a green box.");
            setGameCompleted(true);
          }
        }, 2000); // Duration of the moveUp animation in milliseconds
      }, 2000); // Duration of the moveDown animation in milliseconds
    }
  };

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
    } else if (keyCode === 32) {
      handleSpacebarPress();
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

  // renders the claw
  const clawStyle = {
    left: `${clawPosition.x * clawVisualSize}px`,
    top: `${clawPosition.y * clawVisualSize}px`,
    width: `${clawSize.width * clawVisualSize}px`,
    height: `${clawSize.height * clawVisualSize}px`
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
    setClawPosition({ x: 0, y: 1 }); // Reset claw position to (0, 0)
    setRetries(retries - 1); // Decrement the number of retries
  };

  return (
    <div className="game-container" ref={containerRef}>
      {renderGrid()}
      <div className={`claw ${isMoving ? 'move-down-animation' : 'move-up-animation'}`} style={clawStyle}></div>
      {gameCompleted && <DialogBox message="Your Superhero is..." onRetryClick={handleRetryClick} retries={retries}/>}
    </div>
  );
};

export default Animation;