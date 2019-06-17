import moxios from 'moxios';
import { testData } from '../assets/TestData';

export const enterAndSubmitQuery = (wrapper) => {
  const newValue = "testing component";
  const inputElement = wrapper.find('.search-input');
  inputElement.simulate('change', { target: { value: newValue }});
  wrapper.find('.component-search').simulate('submit');
}

export const makeMockRequest = (wrapper, expectation, done) => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: testData
    }).then(() => {
      expectation;
      done();
    });
  });
}
