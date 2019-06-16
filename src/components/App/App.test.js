import React from 'react';
import { mount } from 'enzyme';

import App from './App';
import BookList from '../BookList/BookList';
import Search from '../Search/Search';

import { findByTestAttr } from '../../utils/testUtils';

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  })

  it('renders without crashing', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(true);
  });

  it('renders a searchComponent', () => {
    const searchComponent = wrapper.find(Search);
    expect(searchComponent.exists()).toBe(true);
  });

  it('renders a BookList component', () => {
    const bookListComponent = wrapper.find(BookList);
    expect(bookListComponent.exists()).toBe(true);
  });

  it('reflects changes to Search component input in state', () => {
    const newValue = "testing component";
    const inputElement = findByTestAttr(wrapper, 'search-input')

    inputElement.simulate('change', { target: { value: newValue }});
    expect(wrapper.state().searchTerm).toEqual(newValue);
  });
})
