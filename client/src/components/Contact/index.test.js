import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import Contact from './index';
import Client from '../../api/Client';
jest.mock('../../api/Client');

const testContact = (attributes = {}) => {
  return Object.assign({
    action_network_id: 'action_network:4de4d476-85ca-4685-8362-e50d937a106e',
    family_name: 'FamilyName',
    given_name: 'GivenName',
    phone_number: '1234567890',
    call_list: [
      'Sun 01/01/2017 - 00:00 AM PDT'
    ]
  }, attributes)
}

describe('Contact', () => {
  describe('renders', () => {
    it("a contact's given name", () => {
      const contact = testContact();
      const component = shallow(<Contact contact={contact} />);

      const string = component.find("[data-test='givenName']").text();
      const substring = contact.given_name;
      expect(string).toContain(substring);
    });

    it('no given name if there is none', () => {
      const contact = testContact({ given_name: null });
      const component = shallow(<Contact contact={contact} />);

      const actual = component.find("[data-test='givenName']").length;
      const expected = 0;
      expect(actual).toEqual(expected);
    });

    it("a contact's family name", () => {
      const contact = testContact();
      const component = shallow(<Contact contact={contact} />);

      const string = component.find("[data-test='familyName']").text();
      const substring = contact.family_name;
      expect(string).toContain(substring);
    });

    it('no family name if there is none', () => {
      const contact = testContact({ family_name: null });
      const component = shallow(<Contact contact={contact} />);

      const actual = component.find("[data-test='familyName']").length;
      const expected = 0;
      expect(actual).toEqual(expected);
    });

    it("a contact's phone number", () => {
      const contact = testContact();
      const component = shallow(<Contact contact={contact} />);

      const string = component.find("[data-test='phoneNumber']").text();
      const substring = '(123) 456 7890';
      expect(string).toContain(substring);
    });

    it("a 'called' button at the bottom of the contact", () => {
      const contact = testContact();
      const component = shallow(<Contact contact={contact} />);

      const actual = component.find("[data-test='action:called']").length;
      const expected = 1;
      expect(actual).toEqual(expected);
    });

    it("shows a call list if the contact has one", () => {
      const contact = testContact();
      const component = shallow(<Contact contact={contact} />);

      const actual = component.find("[data-test='contactCallList']").length;
      const expected = 1;
      expect(actual).toEqual(expected);
    });

    it("doesn't show a call list if the contact doesn't have one", () => {
      const contact = testContact({ call_list: [] });
      const component = shallow(<Contact contact={contact} />);

      const actual = component.find("[data-test='contactCallList']").length;
      const expected = 0;
      expect(actual).toEqual(expected);
    });
  });

  describe('calls the API client', () => {
    const setup = (additionalProps) => {
      const contact = testContact();
      const props = Object.assign({}, {contact}, {onFinished: jest.fn()}, additionalProps);
      const component = shallow(<Contact {...props} />);

      const calledButton = component.find("[data-test='action:called']");
      const newZipLink = component.find("[data-test='action:newZip']");
      return { component, props, contact, calledButton, newZipLink };
    }

    afterEach(() => {
      Client.updatePerson.mockClear();
    });

    it("#updatePerson with proper args when the user clicks 'called'", () => {
      const { component, calledButton, contact } = setup();
      Client.updatePerson = jest.fn();
      calledButton.simulate('click');
      const actionNetworkID = contact.action_network_id;
      const args = [actionNetworkID, {called: true}]
      expect(Client.updatePerson).toHaveBeenCalledWith(...args);
    });
  });
});