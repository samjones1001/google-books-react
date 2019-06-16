import React from 'react';
import { shallow } from 'enzyme';

import Search from './Search';

describe('Search Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Search />);
  });

  it('renders without crashing', () => {
    const searchElement = wrapper.find("[data-test='component-search']");
    expect(searchElement.exists()).toBe(true);
  });
});
