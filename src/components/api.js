import axios from 'axios';

export const fetchContacts = async () => {
  try {
    const response = await axios.get('https://650ad8e1dfd73d1fab09047e.mockapi.io/contacts');
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addContact = async (contactData) => {
  try {
    const response = await axios.post('https://650ad8e1dfd73d1fab09047e.mockapi.io/contacts', contactData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteContact = async (contactId) => {
  try {
    await axios.delete(`https://650ad8e1dfd73d1fab09047e.mockapi.io/contacts/${contactId}`);
  } catch (error) {
    throw new Error(error.message);
  }
};