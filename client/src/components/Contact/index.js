import React, { Component } from 'react';
import Client from '../../api/Client';
import './index.css';

class Contact extends Component {
  formatPhone (number) {
    const raw = number.replace(/\D/g, '');
    if (raw.length === 10) {
      return raw.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2 $3");
    } else {
      return raw;
    }
  }

  handleClickedNextContact = () => {
    const { action_network_id } = this.props.contact;
    Client.updatePerson(action_network_id, {called: false});
    this.props.onFinished();
  }

  handleContactCalled = () => {
    const { action_network_id } = this.props.contact;
    Client.updatePerson(action_network_id, {called: true});
    this.props.onFinished();
  }

  handleRequestNewZip = () => {
    const { action_network_id } = this.props.contact;
    Client.updatePerson(action_network_id);
  }

  render () {
    const { contact } = this.props;

    return(
      <div className='contact' data-test='contact'>
        {contact.given_name ?
          <div className='contact__name' data-test='givenName'>
            {contact.given_name}
          </div>
        : null} {contact.family_name ?
          <div className='contact__name' data-test='familyName'>
            {contact.family_name}
          </div>
        : null}
        {contact.phone_number ?
          <a className='contact__phone'
               data-test='phoneNumber'
               href={`tel:${contact.phone_number}`}
               target='_blank'>
            {'+1 ' + this.formatPhone(contact.phone_number)}
          </a>
        : null}
        <div className='contact__prompt'>
          <button className='contact__action contact__action--called'
                  data-test='action:called'
                  href='#'
                  onClick={this.handleContactCalled}>
            I spoke with this person
          </button>
          <button
              className='contact__action'
              href='#'
              onClick={this.handleClickedNextContact}>
            Skip contact
          </button>
        </div>
        {contact.call_list && contact.call_list.length > 0 ?
          <div className='contact__call-list' data-test='contactCallList'>
            <br/><br/>
            Previous calls:
            {contact.call_list.map((call, idx) => {
              return(<div key={idx}>{call}</div>)
            })}
          </div>
        : null}
      </div>
    );
  }
}

export default Contact;
