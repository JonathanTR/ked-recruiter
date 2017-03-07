import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    contacts: []
  };

  render() {
    const { contacts } = this.state;

    return (
      <div className="App">
        <h1>#KNOCKEVERYDOOR</h1>
        <form data-test='zipInput'>
          <input placeholder='Enter your zipcode' />
          <button type='submit'>submit</button>
        </form>
        {contacts.length > 0 ?
          contacts.map((contact, idx) => {
            return(
              <div data-test='contact' key={idx}>
                {contact}
              </div>
            )
          })
        : null}
      </div>
    );
  }
}

export default App;
