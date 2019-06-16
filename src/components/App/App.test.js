import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import moxios from 'moxios';

import App from './App';
import BookList from '../BookList/BookList';
import Book from '../Book/Book';
import Search from '../Search/Search';
import { testData } from '../../assets/TestData';
import { findByTestAttr } from '../../utils/testUtils';

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  })

  it('renders without crashing', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(true);
  });

  it('renders a searchComponent', () => {
    const searchComponent = wrapper.find(Search);
    expect(searchComponent.exists()).toBe(true);
  });

  it('renders a BookList component', () => {
    const bookListComponent = wrapper.find(BookList);
    expect(bookListComponent.exists()).toBe(true);
  });

  it('reflects changes to Search component input in state', () => {
    const newValue = "testing component";
    const inputElement = findByTestAttr(wrapper, 'search-input')

    inputElement.simulate('change', { target: { value: newValue }});
    expect(wrapper.state().searchTerm).toEqual(newValue);
  });

  it('renders an initial message prior to api request', () => {
    const messageElement = findByTestAttr(wrapper, 'app-message');
    expect(messageElement.text().length).not.toEqual(0);
  });

  describe('makes requests to an api', () => {
    let wrapper;

    beforeEach(() => {
      moxios.install();
      wrapper = mount(<App />);
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('resets Search Component value', (done) => {
      const newValue = "testing component";
      const inputElement = findByTestAttr(wrapper, 'search-input');
      inputElement.simulate('change', { target: { value: newValue }});
      findByTestAttr(wrapper, 'component-search').simulate('submit');

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: testData
        }).then(() => {
          expect(wrapper.state().searchTerm.length).toEqual(0);
          done();
        });
      });
    });

    describe('on success', () => {
      it('retrieves a list of books and stores them in state', (done) => {
        const newValue = "testing component";
        const inputElement = findByTestAttr(wrapper, 'search-input');
        inputElement.simulate('change', { target: { value: newValue }});
        findByTestAttr(wrapper, 'component-search').simulate('submit');

        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: testData
          }).then(() => {
            expect(wrapper.state().results.length).toEqual(5);
            done();
          });
        });
      });
    });

    describe('on failure', () => {
      it('retrieves an error message and stores it in state', (done) => {
        const error = new Error('Test Error')
        const newValue = "testing component";
        const inputElement = findByTestAttr(wrapper, 'search-input');
        inputElement.simulate('change', { target: { value: newValue }});
        findByTestAttr(wrapper, 'component-search').simulate('submit');

        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 500,
            response: { error }
          }).then(() => {
            expect(wrapper.state().message.length).not.toEqual(0);
            done();
          });
        });
      });
    })
  });
})
