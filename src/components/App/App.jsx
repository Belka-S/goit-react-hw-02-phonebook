import { Component } from 'react';

import { Section } from 'components/Section/Section';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

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

  addContact = contact => {
    const isInContacts = this.state.contacts.some(
      el => el.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isInContacts) {
      return alert(`${contact.name} is already in contacts!`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = contact =>
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== contact.id),
    }));

  setFilter = evt => this.setState({ filter: evt.target.value });

  getFiltredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const filtredContacts = this.getFiltredContacts();

    return (
      <>
        <Section mainTitle={'Phonebook'}>
          <ContactForm handleSubmit={this.addContact} />
        </Section>

        <Section title={'Contacts'}>
          <Filter
            filterValue={this.state.filter}
            handleSearch={this.setFilter}
          />
          <br />
          <ContactList
            contacts={filtredContacts}
            handleDelete={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}
