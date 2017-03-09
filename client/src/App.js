import React, { Component } from 'react';

import './App.css';
import Contact from './components/Contact';
import ZipForm from './components/ZipForm';

class App extends Component {
  state = {
    contacts: [],
  };

  setContacts = (list) => {
    this.setState({
      contacts: list
    });
  }

  render() {
    const { contacts } = this.state;

    return (
      <div className="App">
        <h1>#KNOCKEVERYDOOR</h1>
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
