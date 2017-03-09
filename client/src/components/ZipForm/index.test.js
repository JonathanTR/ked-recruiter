import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import ZipForm from './index';


describe('Zip Code input', () => {
  it('calls #onZipCodeSubmit when a zipCode is submitted', () => {
    const form = mount(<ZipForm />);
    const spy = jest.fn();
    form.setProps({onZipCodeSubmit: spy})
    form.setState({zipValue: '02122'});
    form.find("[data-test='zipForm']").simulate('submit');
    expect(spy).toHaveBeenCalled();
  });

  it('does not call #onZipCodeSubmit if no zip is present', () => {
    const form = mount(<ZipForm />);
    const spy = jest.fn();
    form.setProps({onZipCodeSubmit: spy})
    form.setState({zipValue: ''});
    form.find("[data-test='zipForm']").simulate('submit');
    expect(spy).not.toHaveBeenCalled();
  });

  it('adds an error class to the input if an invalid zip is submitted', () => {
    const form = mount(<ZipForm />);
    form.setState({zipValue: 'abcxyz'});
    form.find("[data-test='zipForm']").simulate('submit');

    const actual = form.find('.zip-form__error').length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });

  it('shows a loading indicator while fetching contacts', () => {
    const form = mount(<ZipForm />);
    form.setState({loading: true});

    const actual = form.find("[data-test='loadingIndicator']").length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });
});