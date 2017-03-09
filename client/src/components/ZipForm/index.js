import React, { Component } from 'react';

import Client from '../../api/Client';
import LoadingIndicator from '../LoadingIndicator';


class ZipForm extends Component {
  state = {
    inputError: false,
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
    e.preventDefault()
    this.setState({zipValue: e.target.value, inputError: false});
  }

  handleZipCodeBlur = (e) => {
    this.setState({inputError: false});
  }

  handleZipCodeSubmit = (e) => {
    e.preventDefault();
    const code = this.state.zipValue;
    if (!!code.match(/\d{5}/)) {
      this.fetchContacts(code);
    } else {
      this.setState({inputError: true});
    };
  }

  render () {
    const { inputError, loading, zipValue } = this.state;

    return(
      <form className='zip-form'
            data-test='zipForm'
            onSubmit={this.handleZipCodeSubmit}>
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
    );
  }
}

export default ZipForm;
