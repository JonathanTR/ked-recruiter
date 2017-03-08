import React, { Component } from 'react';

class Contact extends Component {
  formatPhone (number) {
    const raw = number.replace(/\D/g, '');
    if (raw.length === 10) {
      return raw.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2 $3");
    } else {
      return raw;
    }
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
      </div>
    );
  }
}

export default Contact;
