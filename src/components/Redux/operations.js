import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const isContactNameUnique = (contacts, name) => {
  return contacts.every((contact) => contact.name !== name);
};

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.fetchContacts();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async (contactData, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    if (!isContactNameUnique(state.contacts.items, contactData.name)) {
      throw new Error('Contact with this name already exists.');
    }

    const response = await api.addContact(contactData);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId, { rejectWithValue }) => {
  try {
    await api.deleteContact(contactId);
    return contactId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});