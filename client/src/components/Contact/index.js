import React, { Component } from 'react';
import Client from '../../api/Client';

class Contact extends Component {
  formatPhone (number) {
    const raw = number.replace(/\D/g, '');
    if (raw.length === 10) {
      return raw.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2 $3");
    } else {
      return raw;
    }
  }

  handleContactCalled = () => {
    const { action_network_id } = this.props.contact;
    Client.updatePerson(action_network_id, {called: true});
  }

  render () {
    const { contact } = this.props;

    return(
      <div data-test='contact'>
        {contact.given_name ?
          <div data-test='givenName'>
            {`Given Name: ${contact.given_name}`}
          </div>
        : null}
        {contact.family_name ?
          <div data-test='familyName'>
            {`Family Name: ${contact.family_name}`}
          </div>
        : null}
        {contact.phone_number ?
          <div data-test='phoneNumber'>
            {this.formatPhone(contact.phone_number)}
          </div>
        : null}
        Did you call this person?
        <button data-test='action:called' onClick={this.handleContactCalled}>
          yes
        </button>
      </div>
    );
  }
}

export default Contact;
