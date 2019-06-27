import React from 'react';
import { mount } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import BookList from './BookList';
import Book from '../Book/Book';
import { testData } from '../../fixtures/TestData';

describe('BookList component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BookList books={ testData.items }/>);
  });

  it('renders withour crashing', () => {
    const listComponent = wrapper.find('.component-book-list');
    expect(listComponent.exists()).toBe(true);
  });

  it('does not throw warning with expected props', () => {
    const expectedProps = { books: testData.items };
    const propError = checkPropTypes(BookList.propTypes, expectedProps, 'prop', BookList.name);
    expect(propError).toBeUndefined();
  });

  it('renders the correct number of Book components', () => {
    const bookComponents = wrapper.find(Book);
    expect(bookComponents.length).toBe(5);
  });

  it('passes one element from books state to the each Book component as a prop', () => {
    const expectedProp = wrapper.prop('books')[0].volumeInfo;
    const firstBookComponent = wrapper.find(Book).first();
    expect(firstBookComponent.prop('volumeInfo')).toEqual(expectedProp);
  });
});
