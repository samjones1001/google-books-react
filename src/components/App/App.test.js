import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import moxios from 'moxios';

import App from './App';
import BookList from '../BookList/BookList';
import Book from '../Book/Book';
import Search from '../Search/Search';
import Message from '../Message/Message';
import Loader from '../Loader/Loader';
import { testData } from '../../assets/TestData';
import { findByTestAttr, enterAndSubmitQuery } from '../../utils/testUtils';

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  })

  it('renders without crashing', () => {
    const appComponent = wrapper.find('.component-app');
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

  it('renders an initial message prior to api request', () => {
    const messageElement = wrapper.find(Message);
    expect(messageElement.exists()).toBe(true);
  });

  it('reflects changes to Search component input in state', () => {
    const newValue = 'testing component';
    const inputElement = wrapper.find('.search-input');
    inputElement.simulate('change', { target: { value: newValue }});
    expect(wrapper.state().searchTerm).toEqual(newValue);
  });

  describe('makes requests to an api', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('resets Search Component value', (done) => {
      enterAndSubmitQuery(wrapper)
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

    it('renders a Loader component during the request', (done) => {
      enterAndSubmitQuery(wrapper)
      const loaderComponent = wrapper.find(Loader);
      expect(loaderComponent.exists()).toBe(true)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: testData
        }).then(() => {
          done();
        });
      });
    });

    it('removes the Loader once the request is resolved', (done) => {
      enterAndSubmitQuery(wrapper)
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: testData
        }).then(() => {
          expect(wrapper.state().loading).toBe(false);
          done();
        })
      });
    });

    describe('on success', () => {
      it('retrieves a list of books and stores them in state', (done) => {
        enterAndSubmitQuery(wrapper)
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

      it('removes any previous error message', (done) => {
        wrapper.setState({ message: 'test error message' });
        enterAndSubmitQuery(wrapper)
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: testData
          }).then(() => {
            expect(wrapper.state().message).toBeFalsy();
            done();
          });
        });
      });

      it('stores an error message if no results are returned', (done) => {
        enterAndSubmitQuery(wrapper)
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: {}
          }).then(() => {
            expect(wrapper.state().message.length).not.toEqual(0);
            done();
          });
        });
      });
    });

    describe('on failure', () => {
      it('retrieves an error message and stores it in state', (done) => {
        const error = new Error('Test Error')
        enterAndSubmitQuery(wrapper)
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
