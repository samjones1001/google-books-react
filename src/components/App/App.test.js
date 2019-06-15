import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import BookContainer from '../BookContainer/BookContainer';

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  })

  it('renders without crashing', () => {
    const appComponent = wrapper.find("[data-test='component-app']");
    expect(appComponent.exists()).toBe(true);
  });

  it('renders a BookContainer component', () => {
    const bookContainerComponent = wrapper.find(BookContainer);
    expect(bookContainerComponent.exists()).toBe(true);
  });
})
