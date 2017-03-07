import React, { Component } from 'react';

import './App.css';
import Contact from './components/Contact';

class App extends Component {
  state = {
    contacts: [],
    inputError: false,
    zipValue: '',
  };

  fetchPeople = (code) => {
    const url = `http://localhost:3001/people?zip=${code}&radius=25`
    fetch(url)
    .then((data) => {
      return data.json()
    }).then((response) => {
      this.setState({contacts: response.people})
    })
  }

  handleZipCodeBlur = (e) => {
    this.setState({inputError: false});
  }

  handleZipCodeInput = (e) => {
    e.preventDefault()
    this.setState({zipValue: e.target.value, inputError: false});
  }

  handleZipCodeSubmit = (e) => {
    e.preventDefault();
    const code = this.state.zipValue;
    if (!!code.match(/\d{5}/)) {
      this.fetchPeople(code);
    } else {
      this.setState({inputError: true});
    };
  }

  render() {
    const { contacts, inputError, zipValue } = this.state;

    return (
      <div className="App">
        <h1>#KNOCKEVERYDOOR</h1>
        <form data-test='zipForm' onSubmit={this.handleZipCodeSubmit}>
          <input className={inputError ? 'zip-input__error' : ''}
                 onChange={this.handleZipCodeInput}
                 onBlur={this.handleZipCodeBlur}
                 placeholder='Enter your zipcode'
                 value={zipValue}>
          </input>
          <button type='submit'>submit</button>
        </form>
        {contacts.map((contact, idx) =>
          <Contact contact={contact} key={idx}/>
        )}
      </div>
    );
  }
}

export default App;
