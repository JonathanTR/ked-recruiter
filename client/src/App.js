import React, { Component } from 'react';

import './App.css';
import Contact from './components/Contact';
import ZipForm from './components/ZipForm';

class App extends Component {
  state = {
    contacts: [],
  };

  fetchPeople = (code) => {
    this.setState({loading: true})
    const url = `http://localhost:3001/people?zip=${code}&radius=25`
    fetch(url)
    .then((data) => data.json())
    .then((response) => {
      this.setState({
        contacts: response.people,
        loading: false
      })
    })
  }

  render() {
    const { contacts } = this.state;

    return (
      <div className="App">
        <h1>#KNOCKEVERYDOOR</h1>
        {contacts.length === 0 ?
          <ZipForm onZipCodeSubmit={this.fetchPeople} />
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
