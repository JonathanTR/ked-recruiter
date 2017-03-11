import React, { Component } from 'react';

import './App.css';
import Contact from './components/Contact';
import ZipForm from './components/ZipForm';
import Client from './api/Client';

class App extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    window.onbeforeunload = (e) => {
      const { contacts } = this.state;
      if ( contacts.length > 0) {
        contacts.forEach((contact) => {
          Client.updatePerson(contact.action_network_id)
        })
      };
      return 'Open dialogue'
    }
  }

  setContacts = (list) => {
    this.setState({
      contacts: list
    });
  }

  render() {
    const { contacts } = this.state;

    return (
      <div className="App">
        <h1 className='logo'><span>#</span>KNOCK<span>EVERY</span>DOOR</h1>
        {contacts.length === 0 ?
          <ZipForm onFetchContacts={this.setContacts} />
        : null}
        {contacts.map((contact, idx) =>
          <div key={idx}>
            <Contact contact={contact} />
            <br/>
          </div>
        )}
      </div>
    );
  }
}

export default App;
