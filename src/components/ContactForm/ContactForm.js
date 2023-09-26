import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../Redux/operations';

const ContactForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const contacts = useSelector((state) => state.contacts.items);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); 

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => { 
    setPhone(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name.trim() === '' || phone.trim() === '') return;

    const isNameUnique = contacts.every((contact) => contact.name !== name);
    if (!isNameUnique) {
      alert(`Контакт з ім'ям "${name}" вже існує.`);
      return;
    }

    const newContact = {
      name,
      phone,
    };

    try {
      await dispatch(addContact(newContact));
      setName('');
      setPhone('');
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
          <input type="text" value={phone} onChange={handlePhoneChange} /> 
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