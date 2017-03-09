import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import ZipForm from './index';
import Client from '../../api/Client';

jest.mock('../../api/Client')

describe('ZipForm input', () => {
  it('does not call #onZipCodeSubmit if no zip is present', () => {
    const form = mount(<ZipForm />);
    const spy = jest.fn();
    form.setProps({onFetchContacts: spy})
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

describe('ZipForm submit', () => {
  const setup = (props) => {
    const form = mount(<ZipForm {...props} />);
    const input = form.find("[data-test='zipInput']")
    input.simulate('change', {target: {value: '02122'}})
    form.simulate('submit');

    const invocationArgs = Client.getPeople.mock.calls[0];
    const apiCallback = invocationArgs[1];
    return { form, apiCallback };
  }

  afterEach(() => {
    Client.getPeople.mockClear();
  });

  it('Calls #onFetchContacts with successful API response', () => {
    const spy = jest.fn()
    const { form, apiCallback } = setup({onFetchContacts: spy});
    const response = { people: ['Anton', 'Alycia'] };
    apiCallback(response);

    expect(spy).toHaveBeenCalledWith(response.people)
  });

  it('Shows an error message if it gets one from the API', () => {
    const { form, apiCallback } = setup();
    const response = { error: 'Internal Server Error' };
    apiCallback(response);

    const actual = form.find("[data-test='zipError']").length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });
});