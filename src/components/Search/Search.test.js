import React from 'react';
import { shallow } from 'enzyme';

import Search from './Search';

describe('Search Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      < Search
        placeholderText="This is a test"
        buttonText="test"
      />
    );
  });

  it('renders without crashing', () => {
    const searchComponent = wrapper.find('.component-search')
    expect(searchComponent.exists()).toBe(true);
  });

  it('renders an input element', () => {
    const inputElement = wrapper.find('.search-input')
    expect(inputElement.exists()).toBe(true);
  });

  it('renders the passed placeholder text', () => {
    const inputElement = wrapper.find('.search-input')
    expect(inputElement.prop('placeholder')).toEqual('This is a test');
  });

  it('renders a button', () => {
    const buttonElement = wrapper.find('.search-button')
    expect(buttonElement.exists()).toBe(true);
  });

  it('renders the passed button text', () => {
    const buttonElement = wrapper.find('.search-button')
    expect(buttonElement.text()).toEqual('test');
  });
});
