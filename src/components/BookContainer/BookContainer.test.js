import React from 'react';
import { shallow } from 'enzyme'

import BookContainer from './BookContainer';
import Book from '../Book/Book'
import { testData } from '../../assets/TestData';

describe('BookContainer component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BookContainer books={ testData.items }/>);
  });

  it('renders withour crashing', () => {
    const containerComponent = wrapper.find("[data-test='component-book-container']");
    expect(containerComponent.exists()).toBe(true);
  });

  it('renders the correct number of Book components', () => {
    const bookComponents = wrapper.find(Book);
    expect(bookComponents.length).toBe(5);
  })
});
