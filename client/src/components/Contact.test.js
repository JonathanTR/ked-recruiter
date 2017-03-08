import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import Contact from './Contact';


describe('Contact', () => {
  it("displays a contact's given name", () => {
    const contact = { given_name: 'Given' };
    const component = shallow(<Contact contact={contact} />);

    const string = component.find("[data-test='givenName']").text();
    const substring = 'Given';
    expect(string).toContain(substring);
  });

  it('does not render a given name if there is none', () => {
    const contact = { foo: 'bar' };
    const component = shallow(<Contact contact={contact} />);

    const actual = component.find("[data-test='givenName']").length;
    const expected = 0;
    expect(actual).toEqual(expected);
  });

  it("displays a contact's family name", () => {
    const contact = { family_name: 'Family' };
    const component = shallow(<Contact contact={contact} />);

    const string = component.find("[data-test='familyName']").text();
    const substring = 'Family';
    expect(string).toContain(substring);
  });

  it('does not render a family name if there is none', () => {
    const contact = { foo: 'bar' };
    const component = shallow(<Contact contact={contact} />);

    const actual = component.find("[data-test='familyName']").length;
    const expected = 0;
    expect(actual).toEqual(expected);
  });

  it("displays a contact's phone number", () => {
    const contact = { phone_number: '1234567890' };
    const component = shallow(<Contact contact={contact} />);

    const string = component.find("[data-test='phoneNumber']").text();
    const substring = '(123) 456 7890';
    expect(string).toContain(substring);
  });
});