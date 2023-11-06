import React from 'react';
import './Box.css';

const Box = ({ position }) => {
  const boxStyle = {
    left: `${position.x * 60}px`,
    top: `${position.y * 60}px`,
  };

  return <div className="box" style={boxStyle}></div>;
};

export default Box;
