import React from 'react';
// import smtp from 'smtp-js';

const EmailForm = ({ UniqueID, superheroName, onEmailSent, alreadySent }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Email.send({
    //   SecureToken : "75960234-ce73-4c16-8cbe-4df7491e3a7a",
    //   To : 'muhammad_ibrahim@mymail.sutd.edu.sg',
    //   From : "skh-gh-24@skh.com",
    //   Subject : `Figurine Request - ${superheroName}`,
    //   Body :
    //   `Unique ID: ${UniqueID}
    //   Figurine: ${superheroName}
    //   Thank you for your donation, hero!`,
    // }).then(
    // message => alert(message)
    // );

    // if (!alreadySent) {
    //   smtp
    //     .send(emailConfig)
    //     .then(() => {
    //       console.log('Email sent successfully!');
    //       alert("You've completed the game! Thank you for your donation!");
    //     })
    //     .catch((error) => {
    //       console.error('Error sending email:', error);
    //     });
    // } else {
    //   console.log('Email has already been sent with this id!');
    //   alert('Token has expired! Thank you for your donation!');
    // }
    onEmailSent();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='emailForm'>
        <input type='text' placeholder='Unique ID' value={UniqueID} disabled />
        <input type='text' placeholder='Figurine' value={superheroName} disabled />
        <button type='submit'>I'll take it! Let's go!</button>
      </form>
    </div>
  );
};

export default EmailForm;



// const emailConfig = {
//   host: 'smtp.elasticemail.com',
//   username: 'your_username',
//   password: 'your_password',
//   to: 'them@website.com',
//   from: 'you@isp.com',
//   subject: `Figurine Request - ${superheroName}`,
//   body: `
//     Unique ID: ${UniqueID}
//     Figurine: ${superheroName}

//     Thank you for your request!`,
// };