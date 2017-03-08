import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import App from './App';


describe('Smoke Test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});

describe('Zip Code input', () => {
  it('renders a form to input a zip code', () => {
    const app = shallow(<App />);
    const zipForms = app.find("[data-test='zipForm']");

    const actual = zipForms.length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });

  it('calls #fetchPeople when a zipCode is submitted', () => {
    const app = mount(<App />);
    const spy = jest.fn();
    app.instance().fetchPeople = spy;
    app.update();

    app.setState({zipValue: '02122'});
    app.find("[data-test='zipForm']").simulate('submit');
    expect(spy).toHaveBeenCalled();
  });

  it('does not call #fetchPeople if no zip is present', () => {
    const app = mount(<App />);
    const spy = jest.fn();
    app.instance().fetchPeople = spy;
    app.update();

    app.find("[data-test='zipForm']").simulate('submit');
    expect(spy).not.toHaveBeenCalled();
  });

  it('adds an error class to the input if an invalid zip is submitted', () => {
    const app = mount(<App />);
    app.setState({zipValue: 'abc'});
    app.find("[data-test='zipForm']").simulate('submit');

    const zipForm = app.find("[data-test='zipForm']");
    const actual = zipForm.find('.zip-form__error').length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });

  it('shows a loading indicator while fetching contacts', () => {
    const app = mount(<App />);
    app.setState({loading: true});

    const actual = app.find("[data-test='loadingIndicator']").length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });
});

describe('Display Queued Contacts', () => {
  it('hides the zip code form when displaying contacts', () => {
    const app = mount(<App />);
    app.setState({contacts: ['one','two']});
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

  it('renders a list of contacts, if there are any', () => {
    const app = mount(<App />);
    app.setState({contacts: ['one','two']});
    const contacts = app.find("[data-test='contact']");

    const actual = contacts.length;
    const expected = 2;
    expect(actual).toEqual(expected);
  });
});
