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
  expect(zipInputs.length).toEqual(1);
});

