import React from 'react';
import { shallow } from 'enzyme'

import BookList from './BookList';
import Book from '../Book/Book'
import { testData } from '../../assets/TestData';
import { findByTestAttr } from '../../utils/testUtils';

describe('BookList component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BookList books={ testData.items }/>);
  });

  it('renders withour crashing', () => {
    const listComponent = findByTestAttr(wrapper, 'component-book-list')
    expect(listComponent.exists()).toBe(true);
  });

  it('renders the correct number of Book components', () => {
    const bookComponents = wrapper.find(Book);
    expect(bookComponents.length).toBe(5);
  })
});
