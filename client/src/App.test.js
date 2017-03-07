import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders an input for a zip code', () => {
  const app = shallow(<App />);
  const zipInputs = app.find("[data-test='zipInput']");

  const actual = zipInputs.length;
  const expected = 1;
  expect(actual).toEqual(expected);
});

it('renders a list of contacts, if there are any', () => {
  const app = shallow(<App />);
  app.setState({contacts: ['one','two']});
  const contacts = app.find("[data-test='contact']");

  const actual = contacts.length;
  const expected = 2
  expect(actual).toEqual(expected);
});
