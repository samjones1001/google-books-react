import React from 'react';
import { shallow } from 'enzyme'

import BookList from './BookList';
import Book from '../Book/Book'
import { testData } from '../../assets/TestData';

describe('BookList component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BookList books={ testData.items }/>);
  });

  it('renders withour crashing', () => {
    const listComponent = wrapper.find("[data-test='component-book-list']");
    expect(listComponent.exists()).toBe(true);
  });

  it('renders the correct number of Book components', () => {
    const bookComponents = wrapper.find(Book);
    expect(bookComponents.length).toBe(5);
  })
});
