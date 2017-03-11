import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import App from './App';
import ZipForm from './components/ZipForm';


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
