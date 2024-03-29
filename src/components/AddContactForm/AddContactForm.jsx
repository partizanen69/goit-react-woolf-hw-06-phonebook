import { useState } from 'react';
import { AddContactFormStyled } from './AddContactForm.styled';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../store/contactsSlice';
import { selectContacts } from '../../store/selectors';

const nameInputId = nanoid();
const phoneInputId = nanoid();

export const AddContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { contacts } = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    if (!name) {
      alert('name can not be empty');
      return;
    }

    if (!number) {
      alert('number can not be empty');
      return;
    }

    const nameLower = name.toLowerCase();
    const idx = contacts.findIndex(c => c.name.toLowerCase() === nameLower);
    if (idx > -1) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ name, number, id: nanoid() }));

    setName('');
    setNumber('');
  };

  return (
    <AddContactFormStyled>
      <label htmlFor={nameInputId}>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={e => setName(e.target.value.trim())}
          value={name}
          required
          id={nameInputId}
        />
      </label>
      <label htmlFor={phoneInputId}>
        Phone
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={e => setNumber(e.target.value.trim())}
          value={number}
          required
          id={phoneInputId}
        />
      </label>
      <button type="button" className="add-contact-btn" onClick={handleSubmit}>
        Add contact
      </button>
    </AddContactFormStyled>
  );
};
