import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../Redux/contactsSlice';

const ContactForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === '' || number.trim() === '') return;

    const newContact = {
      name,
      number,
    };

    dispatch(addContact(newContact))
      .then(() => {
        setName('');
        setNumber('');
      })
      .catch((error) => {
        console.error('Error adding contact:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input type="text" value={number} onChange={handleNumberChange} />
        </label>
      </div>
      <div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Contact'}
        </button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
};

export default ContactForm;