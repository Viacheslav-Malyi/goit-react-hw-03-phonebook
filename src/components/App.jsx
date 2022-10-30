import { Component } from 'react';
import { ContactList } from './ContactList/ContactList';
import { Container } from './Container/Container';
import { Filter } from './Filter/Filter';
import { FormContact } from './FormContact/FormContact';
import { Title } from './Title/Title';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    const parsedLocalContacts = JSON.parse(localContacts);

    if (parsedLocalContacts) {
      this.setState({ contacts: parsedLocalContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    const sameName = this.state.contacts.find(
      contact => contact.name === newContact.name
    );
    if (sameName) {
      alert(`${newContact.name} is already on contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  changeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const filerNormalize = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filerNormalize)
    );
  };

  onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filterResult = this.filterContacts();
    return (
      <Container>
        <Title title={'Phonebook'} />
        <FormContact onSubmit={this.addContact} />
        <Title title={'Contacts'} />
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          Contact={filterResult}
          onDeleteContact={this.onDeleteContact}
        />
      </Container>
    );
  }
}
