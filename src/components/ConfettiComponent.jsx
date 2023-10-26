import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import './ConfettiComponent.css';

const ConfettiComponent = () => {
  const confettiWidth = 10000; // Set your desired width
  const confettiHeight = 1000; // Set your desired height
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Clean up confetti effect after a few seconds (adjust the timeout duration as needed)
    const timeout = setTimeout(() => {
      setShowConfetti(false);
    }, 3000); // Confetti effect will last for 2 seconds

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <div className={`confetti${showConfetti ? ' show' : ''}`}>
    <Confetti width={confettiWidth} height={confettiHeight} numberOfPieces={2000} />
  </div>;
};

export default ConfettiComponent;
