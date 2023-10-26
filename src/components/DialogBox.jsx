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

const getRandomSuperhero = () => {
  const randomIndex = Math.floor(Math.random() * superheroNames.length);
  const selectedSuperheroName = superheroNames[randomIndex];
  return {
    name: selectedSuperheroName,
    image: superheroImages[selectedSuperheroName]
  };
};

const DialogBoxContent = ({ message }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [UniqueID, setUniqueID] = useState('');

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

  const randomSuperhero = getRandomSuperhero();

  return (
    <>
      <div className="dialog-box">
        <ConfettiComponent />
        <p>{message}</p>
        <div className="superhero-details">
          <img src={randomSuperhero.image} alt={randomSuperhero.name} />
          <p>{randomSuperhero.name}</p>
        </div>
        <div className="button-container">
          <button>Try Again</button>
          <button>Submit</button>
        </div>
        <div>
          <EmailForm
            UniqueID={UniqueID}
            superheroName={randomSuperhero.name}
            onEmailSent={handleEmailSent}
            alreadySent={emailSent} 
          />
        </div>
      </div> 
    </>
  );
};

export const DialogBox = ({ message }) => {
  return <DialogBoxContent message={message} />; // Pass UniqueID prop to DialogBoxContent
};

export default DialogBox;
