import axios from 'axios';

const baseURL = 'https://650ad8e1dfd73d1fab09047e.mockapi.io/contacts';

export const fetchContacts = async () => {
  try {
    const response = await axios.get(`${baseURL}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addContact = async (contactData) => {
  try {
    const response = await axios.post(`${baseURL}`, contactData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteContact = async (contactId) => {
  try {
    await axios.delete(`${baseURL}/${contactId}`);
  } catch (error) {
    throw new Error(error.message);
  }
};