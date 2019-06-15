import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16';

import BookContainer from './BookContainer';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('BookContainer component', () => {
  it('renders withour crashing', () => {
    const wrapper = shallow(<BookContainer />);
    const containerComponent = wrapper.find("[data-test='component-book-container']");
    expect(containerComponent.exists()).toBe(true);
  });
});
