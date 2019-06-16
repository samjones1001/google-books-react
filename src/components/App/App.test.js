import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import BookList from '../BookList/BookList';
import Search from '../Search/Search';

import { findByTestAttr } from '../../utils/testUtils';

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  })

  it('renders without crashing', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.exists()).toBe(true);
  });

  it('renders a searchComponent', () => {
    const searchComponent = wrapper.find(Search)
    expect(searchComponent.exists()).toBe(true);
  });

  it('renders a BookList component', () => {
    const bookListComponent = wrapper.find(BookList);
    expect(bookListComponent.exists()).toBe(true);
  });
})
