import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../Redux/contactsSlice';

const ContactForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const contacts = useSelector((state) => state.contacts.items);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name.trim() === '' || number.trim() === '') return;

    const isNameUnique = contacts.every((contact) => contact.name !== name);
    if (!isNameUnique) {
      alert(`Контакт з ім'ям "${name}" вже існує.`);
      return;
    }

    const newContact = {
      name,
      number,
    };

    try {
      await dispatch(addContact(newContact));
      setName('');
      setNumber('');
    } catch (error) {
      alert(`Помилка під час додавання контакту: ${error.message}`);
    }
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
          {isLoading ? 'Додавання...' : 'Додати контакт'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;