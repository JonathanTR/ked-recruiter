import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>#KNOCKEVERYDOOR</h1>
        <input data-test='zipInput' placeholder='Enter your zipcode' />
      </div>
    );
  }
}

export default App;
