import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import App from './App';
import ZipForm from './components/ZipForm';
import Client from './api/Client';


describe('Smoke Test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders a form to input a zip code', () => {
    const app = mount(<App />);
    const zipForms = app.find("[data-test='zipForm']");

    const actual = zipForms.length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });
});

describe('Display Queued Contacts', () => {
  it('hides the zip code form when displaying contacts', () => {
    const app = mount(<App />);
    const people = ['Anton', 'Alycia']
    app.setState({ contacts: people });
    const actual = app.find("[data-test='zipForm']").length;
    const expected = 0;
    expect(actual).toEqual(expected);
  });

  it('renders no contacts, if there are none', () => {
    const app = mount(<App />);
    app.setState({contacts: []});
    const contacts = app.find("[data-test='contact']");

    const actual = contacts.length;
    const expected = 0;
    expect(actual).toEqual(expected);
  });

  it('renders one contact at a time', () => {
    const app = mount(<App />);
    app.setState({contacts: ['one','two']});
    const contacts = app.find("[data-test='contact']");

    const actual = contacts.length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });
});

describe('Entering a new zip code', () => {
  it('renders a link to enter a new zip code', () => {
    const app = shallow(<App />);
    app.setState({contacts: ['one','two']});

    const actual = app.find("[data-test='action:newZip']").length;
    const expected = 1;
    expect(actual).toEqual(expected);
  })

  it('resets the form when the user clicks that link', () => {
    const app = mount(<App />);
    Client.updatePerson = jest.fn();
    app.setState({contacts: ['one','two']});
    const newZipLink = app.find("[data-test='action:newZip']");
    newZipLink.simulate('click');

    const contacts = app.state().contacts;
    expect(contacts.length).toEqual(0);

    const ZipForms = app.find("[data-test='zipForm']");
    expect(ZipForms.length).toEqual(1);
  });

  it('calls the reset endpoint for every contact', () => {
    const app = mount(<App />);
    const contacts = [
      {action_network_id: 'action_network:aae42d06-4d58-4d7c-a992-98e305a9a6e5'},
      {action_network_id: 'action_network:e8a2e323-4463-41b5-ad52-cdd700ccc922'}
    ];
    app.setState({ contacts });
    Client.updatePerson = jest.fn();
    const newZipLink = app.find("[data-test='action:newZip']");
    newZipLink.simulate('click');

    const actual = Client.updatePerson.mock.calls.length;
    const expected = 2;
    expect(actual).toEqual(expected);
  });
});
