import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Book from './Book';
import { testData } from '../../assets/TestData';

Enzyme.configure({ adapter : new EnzymeAdapter() })

it('renders without crashing', () => {
  const wrapper = shallow(<Book />);
  const bookComponent = wrapper.find("[data-test='component-book']");
  expect(bookComponent.exists()).toBe(true);
});

it('renders the passed title', () => {
  const title = testData.items[0].title;
  const wrapper = shallow(<Book title={ title }/>);
  let titleElement = wrapper.find("[data-test='book-title']");
  expect(titleElement.text()).toEqual(title);
});

it('renders the passed image', () => {
  const imageLink = testData.items[0].imageLink;
  const wrapper = shallow(<Book imageLink={ imageLink }/>);
  let imageElement = wrapper.find("[data-test='book-image']");
  expect(imageElement.prop('src')).toEqual(imageLink);
});

it('renders the passed author', () => {
  const author = testData.items[0].authors[0];
  const wrapper = shallow(<Book author={ author }/>);
  let authorElement = wrapper.find("[data-test='book-author']");
  expect(authorElement.text()).toEqual(author);
});

it('renders the passed publisher', () => {
  const publisher = testData.items[0].publisher;
  const wrapper = shallow(<Book publisher={ publisher } />);
  let publisherElement = wrapper.find("[data-test='book-publisher']");
  expect(publisherElement.text()).toEqual(publisher);
});

it('renders a link to the book\'s info page', () => {
  const infoLink = testData.items[0].infoLink;
  const wrapper = shallow(<Book infoLink={ infoLink } />);
  let infoLinkElement = wrapper.find("[data-test='book-info-link']");
  expect(infoLinkElement.prop('href')).toEqual(infoLink);
});
