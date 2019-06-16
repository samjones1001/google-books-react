import React from 'react';
import { shallow } from 'enzyme';

import Message from './Message';
import { findByTestAttr } from '../../utils/testUtils';

describe('Message component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Message messageText="test message"/>);
  });

  it('renders without crashing', () => {
    const messageComponent = findByTestAttr(wrapper, 'component-message');
    expect(messageComponent.exists()).toBe(true);
  });

  it('renders with the passed text', () => {
    const messageComponent = findByTestAttr(wrapper, 'component-message');
    expect(messageComponent.text()).toEqual("test message")
  })
});