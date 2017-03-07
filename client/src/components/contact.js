import React, { Component } from 'react';

class Contact extends Component {
  render () {
    const { contact } = this.props;

    return(
      <div data-test='contact'>
        {contact}
      </div>
    );
  }
}

export default Contact;
