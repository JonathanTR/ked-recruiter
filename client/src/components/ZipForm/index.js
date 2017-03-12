import React, { Component } from 'react';

import Client from '../../api/Client';
import LoadingIndicator from '../LoadingIndicator';
import './index.css';


class ZipForm extends Component {
  state = {
    errorMessage: '',
    infoMessage: '',
    loading: false,
    zipValue: '',
  }

  fetchContacts = (code) => {
    this.setState({loading: true})
    Client.getPeople(code, (response) => {
      if (response.error) {
        this.setState({errorMessage: response.error, loading: false});
      } else if (response.people.length === 0) {
        this.setState({
          infoMessage: "Bummer, we couldn't find anyone in your area. \n Keep checking back!",
          loading: false,
        });
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
    const { errorMessage, infoMessage, loading, zipValue } = this.state;

    return(
      <form className='zip-form'
            data-test='zipForm'
            onSubmit={this.handleZipCodeSubmit}>
        <input className='zip-form__input'
               data-test='zipInput'
               onChange={this.handleZipCodeInput}
               onBlur={this.handleZipCodeBlur}
               placeholder='Enter your zipcode'
               value={zipValue}>
        </input>
        <button className='zip-form__button' type='submit'>Let's Go!</button>
        {errorMessage ?
          <div className='zip-form__error' data-test='zipError'>
            {errorMessage}
          </div>
        : null}
        {infoMessage ?
          <div className='zip-form__info' data-test='zipInfo'>
            {infoMessage}
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
