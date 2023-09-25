import React from 'react';

const Contact = ({ name, number }) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Phone Number: {number}</p>
    </div>
  );
};

export default Contact;