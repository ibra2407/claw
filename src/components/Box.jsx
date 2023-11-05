import React from 'react';
import './Box.css';

const Box = ({ position }) => {
  const boxStyle = {
    left: `${position.x * 30}px`, // Assuming the box size is 30px
    top: `${position.y * 30}px`,
  };

  return <div className="box" style={boxStyle}></div>;
};

export default Box;
