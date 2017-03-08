import React, { Component } from 'react';

import './App.css';
import Contact from './components/Contact';
import LoadingIndicator from './components/LoadingIndicator';

class App extends Component {
  state = {
    contacts: [],
    inputError: false,
    loading: false,
    zipValue: '',
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
    const { contacts, inputError, loading, zipValue } = this.state;

    return (
      <div className="App">
        <h1>#KNOCKEVERYDOOR</h1>
        {contacts.length === 0 ?
        <form className='zip-form' data-test='zipForm' onSubmit={this.handleZipCodeSubmit}>
          <input className={inputError ? 'zip-form__error' : ''}
                 onChange={this.handleZipCodeInput}
                 onBlur={this.handleZipCodeBlur}
                 placeholder='Enter your zipcode'
                 value={zipValue}>
          </input>
          <button type='submit'>submit</button>
          {loading ?
            <LoadingIndicator />
          : null}
        </form>
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
