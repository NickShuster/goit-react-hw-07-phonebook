import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: '',
};

const isContactNameUnique = (contacts, name) => {
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

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      });
  },
});

export const { setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;