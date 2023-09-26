import React from 'react';
import { useSelector } from 'react-redux';
import Contact from './Contact';

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts.items) || [];
  const filter = useSelector((state) => state.filter) || '';

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const shouldShowList = filteredContacts.length > 0;

  return (
    <div>
      {shouldShowList && (
        <ul>
          {filteredContacts.map((contact) => (
            <Contact
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.phone}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;