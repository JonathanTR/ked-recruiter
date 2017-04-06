import React, { Component } from 'react';

import './App.css';
import Contact from './components/Contact';
import ZipForm from './components/ZipForm';
import Client from './api/Client';

class App extends Component {
  state = {
    message: 'Ready to recruit some volunteers?',
    contacts: [],
  };

  componentDidMount() {
    window.onbeforeunload = (e) => {
      const { contacts } = this.state;
      if ( contacts.length > 0) {
        contacts.forEach((contact) => {
          Client.updatePerson(contact.action_network_id);
        });
        return 'Open dialogue';
      };
    };
  }

  setContacts = (list) => {
    this.setState({
      contacts: list,
      message: '',
    });
  }

  setNextContact = () => {
    const { contacts } = this.state;
    this.setState({contacts: contacts.slice(1)});

    // We just ejected the last contact, so insert the finished message
    if (contacts.length === 1) {
      this.setState({
        message: 'Great job! Ready for another round?'
      })
    }
  }

  handleRequestNewZip = () => {
    const { contacts } = this.state;
    contacts.forEach((contact) => {
      Client.updatePerson(contact.action_network_id)
    });
    this.setState({contacts: []});
  }

  render() {
    const { contacts, message } = this.state;

    return (
      <div className="App">
        <h1 className='logo'><span>#</span>KNOCK<span>EVERY</span>DOOR</h1>
        <p>
          {message}
        </p>
        {contacts.length === 0 ?
          <ZipForm onFetchContacts={this.setContacts} />
          :
          <div>
            <Contact contact={contacts[0]} onFinished={this.setNextContact} />
            <em className='new-zip-link'>Feeling lost? Enter a different
            {' '}
            <a data-test='action:newZip'
               href='#'
               onClick={this.handleRequestNewZip}>
               Zip Code
             </a>
            .
            </em>
          </div>
        }
      </div>
    );
  }
}

export default App;
