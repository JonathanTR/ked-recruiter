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

  handleRequestNewZip = () => {
    const { contacts } = this.state;
    contacts.forEach((contact) => {
      Client.updatePerson(contact.action_network_id)
    });
    this.setState({contacts: []})
  }

  render() {
    const { contacts } = this.state;

    return (
      <div className="App">
        <h1 className='logo'><span>#</span>KNOCK<span>EVERY</span>DOOR</h1>
        {contacts.length === 0 ?
          <ZipForm onFetchContacts={this.setContacts} />
          :
          <div>
            <Contact contact={contacts[0]} />
            <div >Feeling lost? Enter a different
            {' '}
            <a data-test='action:newZip'
               href='#'
               onClick={this.handleRequestNewZip}>
               Zip Code
             </a>
            .
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
