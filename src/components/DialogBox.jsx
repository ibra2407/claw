import React, { useEffect, useState } from 'react';
import './DialogBox.css';
import EmailForm from './EmailForm.jsx';
import ConfettiComponent from './ConfettiComponent.jsx';

import Batman from "./gameimg/Batman.png";
import CaptainAmerica from "./gameimg/CaptainAmerica.png";
import Cyclops from "./gameimg/Cyclops.png";
import Flash from "./gameimg/Flash.png";
import Hawkeye from "./gameimg/Hawkeye.png";
import Hulk from "./gameimg/Hulk.png";
import Ironman from "./gameimg/Ironman.png";
import Spiderman from "./gameimg/Spiderman.png";
import Thor from "./gameimg/Thor.png";
import Wolverine from "./gameimg/Wolverine.png";
import Superman from "./gameimg/Superman.png";

const superheroNames = [
  "Batman",
  "CaptainAmerica",
  "Cyclops",
  "Hulk",
  "Flash",
  "Hawkeye",
  "Ironman",
  "Spiderman",
  "Superman",
  "Thor",
  "Wolverine"
];

const superheroImages = {
  Batman,
  CaptainAmerica,
  Cyclops,
  Flash,
  Hawkeye,
  Hulk,
  Ironman,
  Spiderman,
  Thor,
  Wolverine,
  Superman
};

const superheroProbabilities = {
  Batman: 1,
  CaptainAmerica: 2,
  Cyclops: 4,
  Flash: 3,
  Hawkeye: 3,
  Hulk: 2,
  Ironman: 1,
  Spiderman: 2,
  Thor: 2,
  Wolverine: 3,
  Superman: 1
};

const generateWeightedSuperheroes = () => {
  let weightedSuperheroes = [];
  for (const superhero in superheroProbabilities) {
    const weight = superheroProbabilities[superhero];
    weightedSuperheroes = [...weightedSuperheroes, ...Array(weight).fill(superhero)];
  }
  return weightedSuperheroes;
};

const getRandomSuperhero = () => {
  const weightedSuperheroes = generateWeightedSuperheroes();
  const randomIndex = Math.floor(Math.random() * weightedSuperheroes.length);
  const selectedSuperheroName = weightedSuperheroes[randomIndex];
  return {
    name: selectedSuperheroName,
    image: superheroImages[selectedSuperheroName]
  };
};


const DialogBoxContent = ({ message, onRetryClick, retries }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [UniqueID, setUniqueID] = useState('');
  const [randomSuperhero, setRandomSuperhero] = useState(getRandomSuperhero());

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    if (id == null) {
      alert("Empty unique ID.")
      console.log(`id invalid!`)
      setEmailSent(true);
    } else {
      setUniqueID(id);
    }
    if (localStorage.getItem(`UniqueID ${id}`) !== null) {
      console.log(`id already used up!`)
      setEmailSent(true);
    }
    else console.log(`EmailSent: ${emailSent}`);
  }, [UniqueID]);

  const handleEmailSent = () => {
    setEmailSent(true);
    localStorage.setItem(`UniqueID ${UniqueID}`, UniqueID);
  };

  console.log("UniqueID in DialogBox component:", UniqueID);
  // Add this line to check the value of UniqueID

  const handleTryAgain = () => {
    if (retries > 0) {
      onRetryClick(); // Call the provided retry click handler when retries are exhausted
    }
  };

  if (emailSent) {
    return (
      <div className="modal-overlay">
        <div className="dialog-box">
          <h1>Thanks for giving, Hero!</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="dialog-box">
          <ConfettiComponent />
          <p>{message}</p>
          <div className="content-container">
            <div className="superhero-details">
              <img src={randomSuperhero.image} alt={randomSuperhero.name} />
              <p>{randomSuperhero.name}</p>
        
      </div>
    </div>
    <div className="email-form-container">
        <div className="button-container">
          {retries > 0 && (
            <button className="try-again-button" onClick={handleTryAgain}>
              You have {retries} {retries === 1 ? 'try' : 'tries'} left!
            </button>)}
        </div>
        <hr></hr>
      <EmailForm
      UniqueID={UniqueID}
      superheroName={randomSuperhero.name}
      onEmailSent={handleEmailSent}
      alreadySent={emailSent}
      />
      </div>
    </div>
  </div>
    </>
  );
};

export const DialogBox = ({ message, onRetryClick, retries }) => {
  return <DialogBoxContent message={message} onRetryClick={onRetryClick} retries={retries}/>; // Pass UniqueID prop to DialogBoxContent
};

export default DialogBox;
