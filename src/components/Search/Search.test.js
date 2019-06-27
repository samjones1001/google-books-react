import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';

import Search from './Search';
import { enterAndSubmitQuery } from '../../utils/testUtils';

describe('Search Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      < Search
        placeholderText="This is a test"
        buttonText="test"
        handleSubmit={ jest.fn() }
      />
    );
  });

  it('renders without crashing', () => {
    const searchComponent = wrapper.find('.component-search');
    expect(searchComponent.exists()).toBe(true);
  });

  it('does not throw warning with expected props', () => {
    const expectedProps = { placeholderText: 'test', buttonText: 'text', handleSubmit: jest.fn() };
    const propError = checkPropTypes(Search.propTypes, expectedProps, 'prop', Search.name);
    expect(propError).toBeUndefined();
  });

  it('renders an input element', () => {
    const inputElement = wrapper.find('.search-input');
    expect(inputElement.exists()).toBe(true);
  });

  it('renders the passed placeholder text', () => {
    const inputElement = wrapper.find('.search-input');
    expect(inputElement.prop('placeholder')).toEqual('This is a test');
  });

  it('renders a button', () => {
    const buttonElement = wrapper.find('.search-button');
    expect(buttonElement.exists()).toBe(true);
  });

  it('renders the passed button text', () => {
    const buttonElement = wrapper.find('.search-button');
    expect(buttonElement.text()).toEqual('test');
  });

  it('has an initial empty searchTerm state', () => {
    expect(wrapper.state().searchTerm.length).toEqual(0)
  });

  it('reflects changes to input in state', () => {
    const newValue = 'testing component';
    const inputElement = wrapper.find('.search-input');
    inputElement.simulate('change', { target: { value: newValue }});
    expect(wrapper.state().searchTerm).toEqual(newValue);
  });

  describe('on submission', () => {
    it('resets searchTerm state', () => {
      enterAndSubmitQuery(wrapper);
      expect(wrapper.state().searchTerm.length).toEqual(0);
    });

    it('calls the function passed as handleSubmit prop', () => {
      enterAndSubmitQuery(wrapper);
      expect(wrapper.instance().props.handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
