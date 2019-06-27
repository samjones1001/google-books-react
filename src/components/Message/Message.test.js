import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';

import Message from './Message';

describe('Message component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Message messageText='test message'/>);
  });

  it('renders without crashing', () => {
    const messageComponent = wrapper.find('.component-message');
    expect(messageComponent.exists()).toBe(true);
  });

  it('does not throw warning with expected props', () => {
    const expectedProps = { messageText: 'test' };
    const propError = checkPropTypes(Message.propTypes, expectedProps, 'prop', Message.name);
    expect(propError).toBeUndefined();
  });

  it('renders with the passed text', () => {
    const messageComponent = wrapper.find('.component-message');
    expect(messageComponent.text()).toEqual('test message');
  });
});
