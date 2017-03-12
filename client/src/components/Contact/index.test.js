import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import Contact from './index';
import Client from '../../api/Client';
jest.mock('../../api/Client');

describe('Contact', () => {
  describe('renders', () => {
    it("a contact's given name", () => {
      const contact = { given_name: 'Given' };
      const component = shallow(<Contact contact={contact} />);

      const string = component.find("[data-test='givenName']").text();
      const substring = 'Given';
      expect(string).toContain(substring);
    });

    it('no given name if there is none', () => {
      const contact = { foo: 'bar' };
      const component = shallow(<Contact contact={contact} />);

      const actual = component.find("[data-test='givenName']").length;
      const expected = 0;
      expect(actual).toEqual(expected);
    });

    it("a contact's family name", () => {
      const contact = { family_name: 'Family' };
      const component = shallow(<Contact contact={contact} />);

      const string = component.find("[data-test='familyName']").text();
      const substring = 'Family';
      expect(string).toContain(substring);
    });

    it('no family name if there is none', () => {
      const contact = { foo: 'bar' };
      const component = shallow(<Contact contact={contact} />);

      const actual = component.find("[data-test='familyName']").length;
      const expected = 0;
      expect(actual).toEqual(expected);
    });

    it("a contact's phone number", () => {
      const contact = { phone_number: '1234567890' };
      const component = shallow(<Contact contact={contact} />);

      const string = component.find("[data-test='phoneNumber']").text();
      const substring = '(123) 456 7890';
      expect(string).toContain(substring);
    });

    it("a 'called' button at the bottom of the contact", () => {
      const contact = {given_name: 'GivenName', family_name: 'FamilyName', phone_number: '1234567890'}
      const component = shallow(<Contact contact={contact} />);

      const actual = component.find("[data-test='action:called']").length;
      const expected = 1;
      expect(actual).toEqual(expected);
    });
  });

  describe('calls the API client', () => {
    const setup = (additionalProps) => {
      const contact = {
        action_network_id: 'action_network:4de4d476-85ca-4685-8362-e50d937a106e',
        family_name: 'FamilyName',
        given_name: 'GivenName',
        phone_number: '1234567890'
      };
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