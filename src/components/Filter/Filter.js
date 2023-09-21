import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, deleteContact } from '../Redux/contactsSlice';

const Filter = () => {
  const contacts = useSelector((state) => state.contacts.items) || [];
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    dispatch(setFilter(value));
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId))
      .then(() => {
        // Optional: Handle successful deletion if needed.
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  };

  return (
    <div>
      <label>
        Filter contacts:
        <input type="text" value={inputValue} onChange={handleFilterChange} />
      </label>
      <ul>
        {contacts
          .filter((contact) =>
            contact.name.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((contact) => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
              <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Filter;