import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      }
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
      }
    case DELETE_CONTACT:
      const filteredContacts = state.contacts.filter(contact => contact.id !== action.payload)
      return {
        ...state,
        contacts: [...filteredContacts]
        // OR contacts: state.contacts.filter.....
      }
    case SET_CURRENT:
      return {
        ...state,
        // The entire Contact object will be set as current
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          // gi - global insensitive / case insesitive
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    default:
      return state;
  }
}