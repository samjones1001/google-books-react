import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16';

import BookContainer from './BookContainer';
import { testData } from '../../assets/TestData';

Enzyme.configure({ adapter: new EnzymeAdapter() });

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
    const bookComponents = wrapper.find("[data-test='book-div']");
    expect(bookComponents.length).toBe(5);
  })
});
