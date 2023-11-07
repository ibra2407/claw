import React, { useState, useEffect } from 'react';
import './Tutorial.css';
import hosp1 from './gameimg/hosp1.jpg'
import hosp2 from './gameimg/hosp2.jpg'
import hosp3 from './gameimg/hosp3.jpg'

const Tutorial = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    // Add a delay before setting the 'open' class to allow the initial rendering
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 100);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Add the 'closing' class to trigger the closing animation
    document.querySelector('.tutorial-dialog').classList.add('closing');
    setTimeout(() => {
        onClose();
    }, 300); // Wait for the duration of the animation (0.3s) before calling onClose
};


  return (
    <div className={`tutorial-dialog ${isOpen ? 'open' : ''}`}>
      <div className="tutorial-content">
        {currentPage === 1 && (
          <div className="page-content">
            <img src={hosp1} className="tutorial-image" />
            <br></br>
            Hello
          </div>
        )}
        {currentPage === 2 && (
          <div className="page-content">
            <img src={hosp2} className="tutorial-image" />
            <br></br>
            Hello
          </div>
        )}
        {currentPage === 3 && (
          <div className="page-content">
            <img src={hosp3} className="tutorial-image" />
            <br></br>
            Hello
          </div>
        )}

        <div className="navigation-buttons">
          {currentPage > 1 && <button className="prev-button" onClick={handlePrevPage}>Prev</button>}
          {currentPage < 3 && <button className="next-button" onClick={handleNextPage}>Next</button>}
        </div>
        <button className="close-button" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Tutorial;
