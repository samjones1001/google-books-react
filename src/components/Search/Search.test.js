import React from 'react';
import { shallow } from 'enzyme';

import Search from './Search';
import { findByTestAttr } from '../../utils/testUtils';

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
    const searchComponent = findByTestAttr(wrapper, 'component-search')
    expect(searchComponent.exists()).toBe(true);
  });

  it('renders an input element', () => {
    const inputElement = findByTestAttr(wrapper, 'search-input')
    expect(inputElement.exists()).toBe(true);
  });

  it('renders the passed placeholder text', () => {
    const inputElement = findByTestAttr(wrapper, 'search-input')
    expect(inputElement.prop('placeholder')).toEqual('This is a test');
  });

  it('renders a button', () => {
    const buttonElement = findByTestAttr(wrapper, 'search-button')
    expect(buttonElement.exists()).toBe(true);
  });

  it('renders the passed button text', () => {
    const buttonElement = findByTestAttr(wrapper, 'search-button')
    expect(buttonElement.text()).toEqual('test');
  });
});
