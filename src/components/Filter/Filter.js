import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../Redux/filterSlice';
import { deleteContact } from '../Redux/operations';

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
      .unwrap()
      .then((contactId) => {
        console.log(`Contact with ID ${contactId} has been deleted.`);
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div>
      <label>
        Filter contacts:
        <input type="text" value={inputValue} onChange={handleFilterChange} />
      </label>
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            {contact.name}: {contact.phone}
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;