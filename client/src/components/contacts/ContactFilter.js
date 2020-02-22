import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;

  // Nothing by default
  // An alternative for forms to refference an actual DOM object
  // Refs provide a way to access DOM nodes or React elements created in the render method.
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  }

  return (
    <form>
      <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange} />
    </form>
  )
}

export default ContactFilter;
