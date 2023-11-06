import React from 'react'
import emailjs from '@emailjs/browser';

const EmailForm = ({ UniqueID, superheroName, onEmailSent, alreadySent }) => {

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = 'service_arkp1em';
    const templateId = 'template_tqp2w0f';
    const publicKey = 'Qps1VbyFe8Ddg4MuA';

    // Create a new object that contains dynamic template params
    const templateParams = {
      uid: UniqueID,
      fig: superheroName,
    };
    if (!alreadySent){
      // Send the email using EmailJS
      emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
        alert("You've completed the game! Thank you for your donation!");
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
    } else{
      console.log("email has already been sent with this id!")
      alert("Token has expired! Thank you for your donation!")
      // just send them to a new page as failsafe
    }
    onEmailSent();
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='emailForm'>
        <input
          type="text"
          placeholder="Unique ID"
          value={UniqueID}
          disabled
        />
        <input
          type="text"
          placeholder="Figurine"
          value={superheroName}
          disabled // Disables field from edits
        />
        <button type="submit">I'll take it! Let's go!</button>
      </form>
    </div>
  );
};

export default EmailForm;
