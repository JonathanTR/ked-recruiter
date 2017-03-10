import React, { Component } from 'react';

import Client from '../../api/Client';
import LoadingIndicator from '../LoadingIndicator';


class ZipForm extends Component {
  state = {
    errorMessage: '',
    loading: false,
    zipValue: '',
  }

  fetchContacts = (code) => {
    this.setState({loading: true})
    Client.getPeople(code, (response) => {
      if (response.error) {
        this.setState({errorMessage: response.error, loading: false});
      } else {
        this.setState({loading: false});
        this.props.onFetchContacts(response.people);
      };
    });
  }

  handleZipCodeInput = (e) => {
    this.setState({
      zipValue: e.target.value,
      errorMessage: ''
    });
  }

  handleZipCodeBlur = (e) => {
    this.setState({errorMessage: ''});
  }

  handleZipCodeSubmit = (e) => {
    e.preventDefault();
    const code = this.state.zipValue;
    if (!!code.match(/^\d{5}$/)) {
      this.fetchContacts(code);
    } else {
      this.setState({errorMessage: "Sorry, that's not a valid zip code 😿"});
    };
  }

  render () {
    const { errorMessage, loading, zipValue } = this.state;

    return(
      <form className='zip-form'
            data-test='zipForm'
            onSubmit={this.handleZipCodeSubmit}>
        <input data-test='zipInput'
               onChange={this.handleZipCodeInput}
               onBlur={this.handleZipCodeBlur}
               placeholder='Enter your zipcode'
               value={zipValue}>
        </input>
        <button type='submit'>submit</button>
        {errorMessage ?
          <div className='zip-form__error' data-test='zipError'>
            {errorMessage}
          </div>
        : null}
        {loading ?
          <LoadingIndicator />
        : null}
      </form>
    );
  }
}

export default ZipForm;
