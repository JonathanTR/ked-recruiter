import React, { Component } from 'react';

class Contact extends Component {
  formatPhone (number) {
    const raw = number.replace(/\D/g, '');
    if (raw.length == 10) {
      return raw.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2 $3");
    } else {
      return raw;
    };
  }

  render () {
    const { contact } = this.props;

    return(
      <div data-test='contact'>
        {contact.given_name ?
          <h1 data-test='givenName'>
            {`Given Name: ${contact.given_name}`}
          </h1>
        : null}
        {contact.family_name ?
          <h1 data-test='familyName'>
            {`Family Name: ${contact.family_name}`}
          </h1>
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
