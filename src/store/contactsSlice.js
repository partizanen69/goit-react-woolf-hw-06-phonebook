import { createSlice } from '@reduxjs/toolkit';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: defaultContacts,
  },
  reducers: {
    addContact(state, action) {
      const { name, number, id } = action.payload;

      const newContact = {
        id,
        name,
        number,
      };

      const newContacts = [...state.contacts, newContact];

      return {
        ...state,
        contacts: newContacts,
      };
    },
    deleteContact(state, action) {
      return {
        contacts: state.contacts.filter(c => c.id !== action.payload),
      };
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
