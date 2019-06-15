import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import BookList from '../BookList/BookList';

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  })

  it('renders without crashing', () => {
    const appComponent = wrapper.find("[data-test='component-app']");
    expect(appComponent.exists()).toBe(true);
  });

  it('renders a BookList component', () => {
    const bookListComponent = wrapper.find(BookList);
    expect(bookListComponent.exists()).toBe(true);
  });
})
