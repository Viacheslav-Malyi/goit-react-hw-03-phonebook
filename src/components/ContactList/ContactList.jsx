import PropTypes from 'prop-types';

import css from '../../components/phonebook.module.css';
import { ContactItem } from '../ContactItem/ContactItem';
export const ContactList = ({ Contact, onDeleteContact }) => {
  return (
    <ul className={css.contact__list}>
      {Contact.map(contact => (
        <ContactItem
          contact={contact}
          onDeleteContact={onDeleteContact}
          key={contact.id}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  Contact: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
