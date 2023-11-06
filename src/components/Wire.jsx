import React from 'react';
import './Wire.css';

const Wire = ({ xCoordinate, isMoving }) => {
  return (
    <div className={`wire ${isMoving ? 'extend-animation' : 'retract-animation'}`} style={{ left: `${xCoordinate * 60 + 28}px` }} />
  );
};

export default Wire;
