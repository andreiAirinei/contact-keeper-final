import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Andrei Airinei',
        email: 'andrei@gmail.com',
        phone: '123-456-789',
        type: 'professional'
      },
      {
        id: 2,
        name: 'Iulia Grigore',
        email: 'iulia@gmail.com',
        phone: '333-444-555',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Catalin Marin',
        email: 'catalin@yahoo.com',
        phone: '111-222-333',
        type: 'personal'
      }
    ],
    // For EDIT button
    current: null,
    // For filtering contacts
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // ####### ACTIONS #########

  // Add Contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  }

  // Delete Contact
  const deleteContact = contactId => {
    dispatch({ type: DELETE_CONTACT, payload: contactId });
  }

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  }

  // Clear CUrrent Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  }

  // Update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  }

  // Filter Contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  }

  // Clear FIlter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  }

  return (
    <ContactContext.Provider value={{
      contacts: state.contacts,
      current: state.current,
      filtered: state.filtered,
      addContact,
      deleteContact,
      setCurrent,
      clearCurrent,
      updateContact,
      filterContacts,
      clearFilter
    }}>
      {props.children}
    </ContactContext.Provider>
  )
};

export default ContactState;