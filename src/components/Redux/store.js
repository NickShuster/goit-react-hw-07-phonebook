import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import { fetchContacts } from './operations';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
  middleware: [...getDefaultMiddleware()],
});

store.dispatch(fetchContacts());

export default store;