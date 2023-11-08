import React, { useState, useEffect } from 'react';
import './Tutorial.css';
import hosp1 from './gameimg/hosp1.png'
import hosp2 from './gameimg/hosp2.png'
import hosp3 from './gameimg/hosp3.png'
import hosp4 from './gameimg/hosp4.png'
import hosp5 from './gameimg/hosp5.png'
import tut1 from './gameimg/tut1.png'
import tut2 from './gameimg/tut2.png'

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
            P1
          </div>
        )}
        {currentPage === 2 && (
          <div className="page-content">
            <img src={hosp2} className="tutorial-image" />
            <br></br>
            P2
          </div>
        )}
        {currentPage === 3 && (
          <div className="page-content">
            <img src={hosp3} className="tutorial-image" />
            <br></br>
            P3
          </div>
        )}
        {currentPage === 4 && (
          <div className="page-content">
            <img src={hosp4} className="tutorial-image" />
            <br></br>
            P4
          </div>
        )}
        {currentPage === 5 && (
          <div className="page-content">
            <img src={hosp5} className="tutorial-image" />
            <br></br>
            P5
          </div>
        )}
        {currentPage === 6 && (
          <div className="page-content">
            <img src={tut1} className="tutorial-image" />
            <br></br>
            T1
          </div>
        )}
        {currentPage === 7 && (
          <div className="page-content">
            <img src={tut2} className="tutorial-image" />
            <br></br>
            T2
          </div>
        )}

        <div className="navigation-buttons">
          {currentPage > 1 && <button className="prev-button" onClick={handlePrevPage}>Prev</button>}
          {currentPage < 7 && <button className="next-button" onClick={handleNextPage}>Next</button>}
        </div>
        <button className="close-button" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Tutorial;
