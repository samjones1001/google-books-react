import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Book from './Book';

Enzyme.configure({ adapter : new EnzymeAdapter() })

it('renders without crashing', () => {
  const wrapper = shallow(<Book />);
  const bookComponent = wrapper.find("[data-test='component-book']");
  expect(bookComponent.exists()).toBe(true);
});
