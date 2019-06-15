import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';
import BookContainer from '../BookContainer/BookContainer';

Enzyme.configure({ adapter: new EnzymeAdapter() })

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
